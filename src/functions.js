import properties from './properties'
import camelcase from 'camelcase'

export default {
  cssToJs: (value, webAnimationsAPI = true) => {
    let property = value.toLowerCase()
    if (webAnimationsAPI) {
      if (property === 'float' || property === 'offset') {
        property = 'css-' + property
      }
    }
    return camelcase(property)
  },

  isAnimatable: (value, returnCssProperty = false) => {
    let property = value.toLowerCase()
    if (property.substr(0, 3) === 'css') {
      property = property.substr(3)
    }
    if (properties.includes(property)) {
      return returnCssProperty ? property : true
    }
    property = property.replace(/-/g, '')
    for (const prop of properties) {
      if (property === prop.replace(/-/g, '')) {
        return returnCssProperty ? prop : true
      }
    }
    return false
  },
}
