import isNumber from 'lodash.isnumber'
import isPlainObject from 'lodash.isplainobject'
import isString from 'lodash.isstring'
import { parse, walk, lexer } from 'css-tree'
import nonAnimatable from './nonAnimatable.json'
import popularIndex from './popularIndex.json'
import mdnProperties from 'css-tree/node_modules/mdn-data/css/properties.json'
import mdnSyntaxes from 'css-tree/node_modules/mdn-data/css/syntaxes.json'
import patch from 'css-tree/data/patch.json'

const properties = []
Object.keys(lexer.properties).forEach((key) => {
  if (!nonAnimatable.includes(key)) {
    properties.push(key)
  }
})

const isAnimatable = (value, returnCssProperty = false) => {
  let property = value.toLowerCase().trim()
  if (property === 'cssoffset') {
    property = property.substr(3)
  }
  if (properties.includes(property)) {
    return returnCssProperty ? property : true
  }
  if (property.includes('-')) {
    return returnCssProperty ? '' : false
  }
  property = property.replace(/-/g, '')
  for (const prop of properties) {
    if (property === prop.replace(/-/g, '')) {
      return returnCssProperty ? prop : true
    }
  }
  return returnCssProperty ? '' : false
}

const cssToJs = (value, webAnimationsAPI = true) => {
  let property = isAnimatable(value, true)
  if (!property) {
    return ''
  }
  if (webAnimationsAPI) {
    if (property === 'offset') {
      property = 'css-' + property
    }
  }
  return property.replace(/-([a-z])/g, (match, letter) => {
    return letter.toUpperCase()
  })
}

const jsToCss = (value) => {
  return isAnimatable(value, true)
}

const popular = (start = 0, end = 10) => {
  const popular = []
  let notInPopular
  if (end >= popularIndex.length) {
    notInPopular = properties.filter((property) => !popularIndex.includes(properties.indexOf(property)))
  }
  for (let i = start; i < end; i++) {
    if (popularIndex[i] || popularIndex[i] === 0) {
      popular.push(properties[popularIndex[i]])
    } else {
      const property = notInPopular[i - popularIndex.length]
      if (!property) {
        break
      }
      popular.push(property)
    }
  }
  return popular
}

const syntaxes = { main: '', links: {}, order: [] }

const getSyntaxes = (syntax) => {
  const propertyMatches = syntax.match(/<'[a-zA-Z0-9-()]+'>/g)
  if (Array.isArray(propertyMatches)) {
    propertyMatches.forEach((key) => {
      const prop = key.slice(2, -2)
      const propertySyntax = mdnProperties[prop]
      syntaxes[key] = propertySyntax.syntax
      syntaxes.order.push(key)
      getSyntaxes(propertySyntax.syntax)
    })
  }
  const syntaxMatches = syntax.match(/<[a-zA-Z0-9-()]+>/g)
  if (Array.isArray(syntaxMatches)) {
    syntaxMatches.forEach((key) => {
      const prop = key.slice(1, -1)
      if (!syntaxes[key]) {
        const syntaxSyntax = mdnSyntaxes[prop]
        const patchSyntax = patch.syntaxes[prop]
        if (syntaxSyntax) {
          syntaxes[key] = syntaxSyntax.syntax
          syntaxes.order.push(key)
          getSyntaxes(syntaxSyntax.syntax)
        } else if (patchSyntax) {
          syntaxes[key] = patchSyntax.syntax
          syntaxes.order.push(key)
          getSyntaxes(patchSyntax.syntax)
        } else if (!['url-token', 'any-value', 'function-token', 'hex-color', 'declaration-value', 'hash-token', 'zero'].includes(prop)) {
          syntaxes.links[key] = 'https://developer.mozilla.org/docs/Web/CSS/' + prop.replace(/flex/, 'flex_value')
        }
      }
    })
  }
}

const syntax = (value) => {
  for (const member in syntaxes) delete syntaxes[member]
  syntaxes.main = ''
  syntaxes.links = {}
  syntaxes.order = []
  const property = isAnimatable(value, true)
  if (property) {
    const syntax = mdnProperties[property].syntax
    syntaxes.main = syntax
    getSyntaxes(syntax)
  } else {
    syntaxes.main = `Error: ${value} is not an animatable CSS property.`
  }
  return syntaxes
}

const validate = (obj, returnError = true) => {
  const errors = []
  if (!isPlainObject(obj)) {
    errors.push({ name: 'TypeError', message: 'Argument is not a plain object.' })
  } else {
    for (let [key, value] of Object.entries(obj)) {
      if (!isString(value) && !isNumber(value)) {
        errors.push({ name: 'TypeError', message: 'Property value must be a string or a number. ' + typeof value + ' given.' })
      } else {
        const property = isAnimatable(key, true)
        if (!property) {
          errors.push({ name: 'MatchError', message: key + ' is not an animatable CSS property.' })
        } else {
          let ast
          try {
            ast = parse(`${property}: ${value}`, {
              context: 'declaration',
              onParseError: (error) => {
                errors.push(error)
              },
            })
            walk(ast, {
              visit: 'Declaration',
              enter: function (node) {
                const error = lexer.matchDeclaration(node).error
                if (error) {
                  errors.push(error)
                }
              },
            })
          } catch (error) {
            errors.push(error)
          }
        }
      }
    }
  }
  return !errors.length ? true : returnError ? errors[errors.length - 1] : false
}

const propertyFormat = (property, format) => {
  switch (format) {
    case 'css':
      property = jsToCss(property)
      break
    case 'js':
      property = cssToJs(property, false)
      break
    default:
      property = cssToJs(property)
  }
  return property
}

const sanitize = (obj, format = 'waapi') => {
  format = format.toString().toLowerCase()
  let sanitized = {}
  if (Array.isArray(obj)) {
    sanitized = []
    obj.forEach((key) => {
      const property = isAnimatable(key, true)
      if (property) {
        sanitized.push(propertyFormat(property, format))
      }
    })
  } else if (isPlainObject(obj)) {
    for (let [key, value] of Object.entries(obj)) {
      const object = {}
      object[key] = value
      if (validate(object, false)) {
        sanitized[propertyFormat(key, format)] = value
      }
    }
  } else if (isString(obj)) {
    switch (format) {
      case 'css':
        return jsToCss(obj)
      case 'js':
        return cssToJs(obj, false)
      default:
        return cssToJs(obj)
    }
  }
  return sanitized
}

export default {
  properties: properties,
  cssToJs: cssToJs,
  jsToCss: jsToCss,
  isAnimatable: isAnimatable,
  popular: popular,
  syntax: syntax,
  validate: validate,
  sanitize: sanitize,
}
