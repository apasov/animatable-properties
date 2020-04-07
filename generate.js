const fs = require('fs')
const mdnProperties = JSON.parse(fs.readFileSync('node_modules/mdn-data/css/properties.json', 'utf8'))
const properties = ['export default [']
Object.keys(mdnProperties).forEach((key) => {
  if (key.charAt(0) !== '-' && mdnProperties[key].animationType !== 'discrete') {
    properties.push(`'${key}',`)
  }
})
properties.push(']')

const stream = fs.createWriteStream('src/properties.js')
stream.once('open', () => {
  properties.forEach((key) => {
    stream.write(`${key}\n`)
  })
  stream.end()
})
