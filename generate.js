const fs = require('fs')
const popular = JSON.parse(fs.readFileSync('src/popular.json', 'utf8'))
const mdnProperties = JSON.parse(fs.readFileSync(require.resolve('mdn-data-animatable/css/properties.json'), 'utf8'))

const generatePopularIndex = (properties) => {
  const propertiesArray = []
  const popularIndex = []
  Object.keys(properties).forEach((key) => {
    propertiesArray.push(key)
  })
  Object.keys(popular).forEach((key) => {
    popularIndex.push(propertiesArray.indexOf(popular[key]))
  })
  ;['src/popularIndex.json'].forEach((value) => {
    const stream = fs.createWriteStream(value)
    stream.once('open', () => {
      stream.write(`${JSON.stringify(popularIndex)}\n`)
      stream.end()
    })
  })
}
generatePopularIndex(mdnProperties)
