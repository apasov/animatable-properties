const mdnProperties = require('mdn-data/css/properties.json')
const properties = []
Object.keys(mdnProperties).forEach((key) => {
  if (key.charAt(0) !== '-' && mdnProperties[key].animationType !== 'discrete') {
    properties.push(key)
  }
})

export { properties as default }
