const fs = require('fs')
const path = require('path')
const readline = require('readline')
const popular = JSON.parse(fs.readFileSync('src/popular.json', 'utf8'))
const cssTreePath = require.resolve('css-tree').substring(0, require.resolve('css-tree').lastIndexOf('css-tree') + 'css-tree'.length)
const cssTreeMdnPath = path.dirname(path.join(cssTreePath, require.resolve('mdn-data/css').substring(__dirname.length)))
const mdnAnimatableProperties = {}
const nonAnimatableProperties = {}
const filteredSyntaxes = {}
const syntaxes = {}
const syntaxesMdn = {}
const mdnProperties = JSON.parse(fs.readFileSync(require.resolve('mdn-data/css/properties.json'), 'utf8'))
const mdnSyntaxes = JSON.parse(fs.readFileSync(require.resolve('mdn-data/css/syntaxes.json'), 'utf8'))
let importPath = 'mdn-data/css/'
if (fs.existsSync(path.join(cssTreeMdnPath, 'properties.json'))) {
  importPath = 'css-tree/node_modules/mdn-data/css/'
}
const buffer = []
const searchObjects = [
  {
    search: 'import mdnProperties from ',
    replace: `'${importPath}properties.json'`,
  },
  {
    search: 'import mdnSyntaxes from ',
    replace: `'${importPath}syntaxes.json'`,
  },
]
async function processLineByLine(path) {
  const fileStream = fs.createReadStream(path)

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  for await (let line of rl) {
    searchObjects.forEach((obj) => {
      const substr = line.indexOf(obj.search)
      if (substr >= 0) {
        line = line.substring(0, substr + obj.search.length) + obj.replace
      }
    })
    buffer.push(line)
  }

  fileStream.once('close', () => {
    const stream = fs.createWriteStream(path)
    stream.once('open', () => {
      buffer.forEach((key) => {
        stream.write(`${key}\n`)
      })
      stream.end()
    })
  })
}

processLineByLine('src/functions.js')

const getMatches = (property) => {
  const matches = mdnProperties[property]['syntax'].match(/<[a-zA-Z0-9-()]+>/g)
  if (Array.isArray(matches)) {
    matches.forEach((key) => {
      syntaxes[key.slice(1, -1)] = true
    })
  }
}
// Include some non-animatable properties in order not to break syntax validation
const getNonAnimatableProperties = (property) => {
  // Detect non-animatable properties which should be included in syntaxes
  const additionalMatches = mdnProperties[property]['syntax'].match(/<'[a-zA-Z0-9-()]+'>/g)
  if (Array.isArray(additionalMatches)) {
    additionalMatches.forEach((ke) => {
      const prop = ke.slice(2, -2)
      if (mdnProperties[prop].animationType === 'discrete') {
        if (nonAnimatableProperties[prop] !== true) {
          nonAnimatableProperties[prop] = true
          getMatches(prop)
          getNonAnimatableProperties(prop)
        }
      }
    })
  }
}
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
// Filter out all properties except animatable
Object.keys(mdnProperties).forEach((key) => {
  if (!mdnProperties[key].animationType) {
    console.log('Already patched')
    process.exit()
  }
  if (key.charAt(0) !== '-' && mdnProperties[key].animationType !== 'discrete') {
    mdnAnimatableProperties[key] = { syntax: mdnProperties[key]['syntax'] }
    // Filter out all syntaxes except used in animatable properties
    getNonAnimatableProperties(key)
    getMatches(key)
  }
})
const nonAnimatablePropertiesArray = []
Object.keys(nonAnimatableProperties).forEach((key) => {
  mdnAnimatableProperties[key] = { syntax: mdnProperties[key]['syntax'] }
  nonAnimatablePropertiesArray.push(key)
})
;['src/nonAnimatable.json'].forEach((value) => {
  const stream = fs.createWriteStream(value)
  stream.once('open', () => {
    stream.write(`${JSON.stringify(nonAnimatablePropertiesArray)}\n`)
    stream.end()
  })
})
;[require.resolve('mdn-data/css/at-rules.json'), path.join(cssTreeMdnPath, 'at-rules.json')].forEach((value) => {
  if (fs.existsSync(value)) {
    const stream = fs.createWriteStream(value)
    stream.once('open', () => {
      stream.write(`{}\n`)
      stream.end()
    })
  }
})
;[require.resolve('mdn-data/css/properties.json'), path.join(cssTreeMdnPath, 'properties.json')].forEach((value) => {
  if (fs.existsSync(value)) {
    const stream = fs.createWriteStream(value)
    stream.once('open', () => {
      stream.write(`${JSON.stringify(mdnAnimatableProperties)}\n`)
      stream.end()
    })
  }
})

// Filter out all syntaxes except used in animatable properties
const getSyntaxes = (syntaxes) => {
  Object.keys(syntaxes).forEach((key) => {
    if (Object.keys(mdnSyntaxes).includes(key)) {
      syntaxesMdn[key] = true
      const matches = mdnSyntaxes[key]['syntax'].match(/<[a-zA-Z0-9-()]+>/g)
      if (Array.isArray(matches)) {
        matches.forEach((key) => {
          if (syntaxesMdn[key.slice(1, -1)] !== true) {
            const syntax = {}
            syntax[key.slice(1, -1)] = true
            syntaxesMdn[key.slice(1, -1)] = true
            getSyntaxes(syntax)
          }
        })
      }
    }
  })
}
getSyntaxes(syntaxes)
Object.keys(mdnSyntaxes).forEach((key) => {
  if (Object.keys(syntaxesMdn).includes(key)) {
    filteredSyntaxes[key] = mdnSyntaxes[key]
  }
})
;[require.resolve('mdn-data/css/syntaxes.json'), path.join(cssTreeMdnPath, 'syntaxes.json')].forEach((value) => {
  if (fs.existsSync(value)) {
    const stream = fs.createWriteStream(value)
    stream.once('open', () => {
      stream.write(`${JSON.stringify(filteredSyntaxes)}\n`)
      stream.end()
    })
  }
})

// Filter patch syntaxes
const patch = JSON.parse(fs.readFileSync(require.resolve('css-tree/data/patch.json'), 'utf8'))
const filteredPatchSyntaxes = {}
const patchSyntaxes = {}
const getPatchedSyntaxes = (syntaxes) => {
  Object.keys(syntaxes).forEach((key) => {
    if (Object.keys(patch.syntaxes).includes(key)) {
      patchSyntaxes[key] = true
      const matches = patch.syntaxes[key]['syntax'].match(/<[a-zA-Z0-9-()]+>/g)
      if (Array.isArray(matches)) {
        matches.forEach((key) => {
          if (patchSyntaxes[key.slice(1, -1)] !== true) {
            const syntax = {}
            syntax[key.slice(1, -1)] = true
            patchSyntaxes[key.slice(1, -1)] = true
            getPatchedSyntaxes(syntax)
          }
        })
      }
    }
  })
}

Object.keys(patch.syntaxes).forEach((key) => {
  if (!Object.keys(filteredSyntaxes).includes(key) && Object.keys(syntaxesMdn).includes(key)) {
    const syntax = {}
    syntax[key] = true
    getPatchedSyntaxes(syntax)
  }
})
Object.keys(patch.syntaxes).forEach((key) => {
  if (Object.keys(patchSyntaxes).includes(key)) {
    filteredPatchSyntaxes[key] = { syntax: patch.syntaxes[key].syntax }
  }
})
;[require.resolve('css-tree/data/patch.json')].forEach((value) => {
  if (fs.existsSync(value)) {
    const stream = fs.createWriteStream(value)
    stream.once('open', () => {
      stream.write(`${JSON.stringify({ properties: {}, syntaxes: filteredPatchSyntaxes })}\n`)
      stream.end()
    })
  }
})
generatePopularIndex(mdnAnimatableProperties)
