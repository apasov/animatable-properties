import functions from './functions'

export default {
  properties: functions.properties.map((val) => functions.cssToJs(val)),
  propertiesCSS: functions.properties,
  propertiesJS: functions.properties.map((val) => functions.cssToJs(val, false)),
}
