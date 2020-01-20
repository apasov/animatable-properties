import properties from './properties'
import functions from './functions'

export default {
  properties: properties.map(val => functions.cssToJs(val)),
  propertiesCSS: properties,
  propertiesJS: properties.map(val => functions.cssToJs(val, false))
}
