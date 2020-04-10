import * as functions from '../src/index'

const testData = {
  isAnimatable: {
    true: ['all', 'offset', 'cssOffset', 'cSSoFFSet', 'grid-column-gap', 'grId-coLumn-GAP', 'grIdcoLumnGAP', 'gridCoLumnGap'],
    false: ['float', 'cssfloat', 'cSSFLOAt', 'hyphens'],
    returnCssProperty: [{ 'text-decoration-thickness': 'text-decoration-thickness' }, { textdecorationTHICKNess: 'text-decoration-thickness' }, { textdecorrationTHICKNess: '' }],
  },

  cssToJs: {
    true: [{ float: 'cssFloat' }, { offset: 'cssOffset' }, { 'grid-column-gap': 'gridColumnGap' }],
    false: [{ float: 'float' }, { offset: 'offset' }],
  },

  jsToCss: {
    returnCssProperty: [{ 'scroll-padding-block-end': 'scroll-padding-block-end' }, { scrollpadDINGBLOCkend: 'scroll-padding-block-end' }],
  },
}

const testFn = (testData, key) => {
  describe(`\n\n******************************\n${key}()\n******************************\n`, () => {
    Object.keys(testData[key]).forEach(function (ke) {
      testData[key][ke].forEach((element) => {
        if (key === 'isAnimatable') {
          if (ke === 'returnCssProperty') {
            const expected = element[Object.keys(element)[0]]
            test(`${key}('${Object.keys(element)[0]}', true) to equal ${JSON.stringify(expected)}`, () => {
              expect(functions[key](Object.keys(element)[0], true)).toBe(expected)
            })
          } else {
            const expected = ke === 'true'
            test(`${key}('${element}') to equal ${JSON.stringify(expected)}`, () => {
              expect(functions[key](element)).toBe(expected)
            })
          }
        } else if (key === 'jsToCss') {
          const expected = element[Object.keys(element)[0]]
          test(`${key}('${Object.keys(element)[0]}') to equal ${JSON.stringify(expected)}`, () => {
            expect(functions[key](Object.keys(element)[0])).toBe(expected)
          })
        } else {
          const webAnimationsAPI = ke === 'true' ? [] : [false]
          Object.keys(element).forEach(function (k) {
            test(`${key}('${k}'${webAnimationsAPI.length ? ', ' + webAnimationsAPI.join() : ''}) to equal ${JSON.stringify(element[k])}`, () => {
              expect(functions[key](k, ...webAnimationsAPI)).toBe(element[k])
            })
          })
        }
      })
    })
  })
}

Object.keys(testData).forEach(function (key) {
  testFn(testData, key)
})
