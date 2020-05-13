import arrays from './arrays'
import functions from './functions'

export const properties = arrays.properties
export const propertiesCSS = arrays.propertiesCSS
export const propertiesJS = arrays.propertiesJS
export const cssToJs = functions.cssToJs
export const jsToCss = (value) => {
  return functions.isAnimatable(value, true)
}
export const isAnimatable = functions.isAnimatable
export const popular = functions.popular
export const syntax = functions.syntax
export const validate = functions.validate
export const sanitize = functions.sanitize
