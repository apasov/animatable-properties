import functions from '../src/functions'

const testData = {
  isAnimatable: {
    true: ['all', 'offset', 'cssOffset', 'cSSoFFSet', 'grid-column-gap', 'grId-coLumn-GAP', 'grIdcoLumnGAP', 'gridCoLumnGap'],
    false: ['float', 'cssfloat', 'cSSFLOAt', 'hyphens']
  },

  cssToJs: {
    true: [{ float: 'cssFloat' }, { offset: 'cssOffset' }, { 'grid-column-gap': 'gridColumnGap' }],
    false: [{ float: 'float' }, { offset: 'offset' }]
  }
}

Object.keys(testData).forEach(function (key) {
  Object.keys(testData[key]).forEach(function (ke) {
    testData[key][ke].forEach(element => {
      if (key === 'isAnimatable') {
        const expected = (ke === 'true')
        test(`${key}('${element}') to equal ${expected}`, () => {
          expect(functions[key](element)).toBe(expected)
        })
      } else {
        const webAnimationsAPI = (ke === 'true')
        Object.keys(element).forEach(function (k) {
          test(`${key}('${k}', ${webAnimationsAPI}) to equal ${element[k]}`, () => {
            expect(functions[key](k, webAnimationsAPI)).toBe(element[k])
          })
        })
      }
    })
  })
})
