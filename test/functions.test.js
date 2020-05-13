import * as functions from '../src/index'

const testData = {
  validate: {
    true: [
      {
        'scroll-padding-block-end': '10px',
      },
    ],
    false: [
      'scrroll-padding-block-end',
      {
        'scroll-padding-block-end': ['10px', '5px'],
      },
      {
        'scrroll-padding-block-end': '10px',
      },
      {
        'scroll-padding-block-end': ':!@#$%^&*""\'():',
      },
      {
        'scroll-padding-block-end': 'a',
      },
    ],
    error: [
      {
        'scroll-padding-block-end': ':!@#$%^&*""\'():',
      },
    ],
    all: [
      {
        'scroll-padding-block-end': ':!@#$%^&*""\'():',
      },
    ],
  },

  syntax: {
    true: [{ all: 'all' }, { float: 'float' }],
  },

  isAnimatable: {
    true: ['all', 'offset', 'cssOffset', 'cSSoFFSet', 'grid-column-gap', 'grId-coLumn-GAP', 'grIdcoLumnGAP', 'gridCoLumnGap'],
    false: ['float', 'cssfloat', 'cSSFLOAt', 'hyphens', 'grid-column-g-ap'],
    returnCssProperty: [{ 'text-decoration-thickness': 'text-decoration-thickness' }, { textdecorationTHICKNess: 'text-decoration-thickness' }, { textdecorrationTHICKNess: '' }],
  },

  cssToJs: {
    true: [{ float: '' }, { offset: 'cssOffset' }, { 'grid-column-gap': 'gridColumnGap' }],
    false: [{ float: '' }, { offset: 'offset' }],
  },

  jsToCss: {
    returnCssProperty: [{ 'scroll-padding-block-end': 'scroll-padding-block-end' }, { scrollpadDINGBLOCkend: 'scroll-padding-block-end' }],
  },

  sanitize: {
    true: [
      {
        test: { 'scroll-padding-block-end': '10px' },
        expected: { 'scroll-padding-block-end': '10px' },
        format: 'css',
      },
      {
        test: { 'scroll-padding-block-end': '10px' },
        expected: { scrollPaddingBlockEnd: '10px' },
        format: 'js',
      },
      {
        test: { offset: 'auto' },
        expected: { cssOffset: 'auto' },
        format: '',
      },
      {
        test: 'scrollpaddingblockend',
        expected: 'scroll-padding-block-end',
        format: 'css',
      },
      {
        test: 'offset',
        expected: 'offset',
        format: 'js',
      },
      {
        test: 'offset',
        expected: 'cssOffset',
        format: '',
      },
    ],
    false: [
      11,
      {
        'scroll-padding-block-end': ['10px', '5px'],
      },
    ],
    array: [
      {
        0: ['opacity', 'transform', 'background-color', 'webkit-text-fill-color', 'color', 'visibility', 'width', 'border-bottom-color', 'border-top-color'],
      },
    ],
  },

  popular: {
    true: [{ 0: ['opacity', 'transform', 'background-color'] }],
  },
}

const testSyntax = (testExpression, key = 'syntax') => {
  test(`${key}('${testExpression}') to return a proper ${key} object`, () => {
    expect(functions[key](testExpression)).toEqual(
      expect.objectContaining({
        main: expect.not.stringMatching(/^\s*$/),
        links: expect.any(Object),
        order: expect.any(Array),
      })
    )
  })
}
const testFn = (testData, testFunction) => {
  describe(`\n\n******************************\n${testFunction}()\n******************************\n`, () => {
    Object.keys(testData[testFunction]).forEach(function (testCase) {
      testData[testFunction][testCase].forEach((element) => {
        if (testFunction === 'isAnimatable') {
          if (testCase === 'returnCssProperty') {
            const expected = element[Object.keys(element)[0]]
            test(`${testFunction}('${Object.keys(element)[0]}', true) to equal ${JSON.stringify(expected)}`, () => {
              expect(functions[testFunction](Object.keys(element)[0], true)).toBe(expected)
            })
          } else {
            const expected = testCase === 'true'
            test(`${testFunction}('${element}') to equal ${JSON.stringify(expected)}`, () => {
              expect(functions[testFunction](element)).toBe(expected)
            })
          }
        } else if (testFunction === 'jsToCss') {
          const expected = element[Object.keys(element)[0]]
          test(`${testFunction}('${Object.keys(element)[0]}') to equal ${JSON.stringify(expected)}`, () => {
            expect(functions[testFunction](Object.keys(element)[0])).toBe(expected)
          })
        } else if (testFunction === 'validate') {
          if (testCase === 'error') {
            test(`${testFunction}(${JSON.stringify(element)}) not to equal ${JSON.stringify(true)}`, () => {
              expect(functions[testFunction](element)).not.toBe(true)
            })
          } else if (testCase === 'all') {
            functions.properties.forEach((property) => {
              const object = {}
              object[property] = 'abcdefgh'
              test(`${testFunction}(${JSON.stringify(object)}, false) to equal ${JSON.stringify(false)}`, () => {
                expect(functions[testFunction](object, false)).toBe(false)
              })
            })
          } else {
            const expected = testCase === 'true'
            test(`${testFunction}(${JSON.stringify(element)}, false) to equal ${JSON.stringify(expected)}`, () => {
              expect(functions[testFunction](element, false)).toBe(expected)
            })
          }
        } else if (testFunction === 'sanitize') {
          if (testCase === 'array') {
            const testExpression = element[Object.keys(element)[0]]
            const expected = ['opacity', 'transform', 'backgroundColor', 'color', 'visibility', 'width', 'borderBottomColor', 'borderTopColor']
            const notExpected = ['webkit-text-fill-color']
            test(`${testFunction}(${JSON.stringify(testExpression)})  to be array containing ${JSON.stringify(expected)}`, () => {
              expect(functions[testFunction](testExpression)).toEqual(expect.arrayContaining(expected)), //
                expect(functions[testFunction](testExpression)).not.toEqual(expect.arrayContaining(notExpected))
            })
          } else if (testCase === 'false') {
            const expected = {}
            test(`${testFunction}(${JSON.stringify(element)}) to equal ${JSON.stringify(expected)}`, () => {
              expect(functions[testFunction](element)).toEqual(expected)
            })
          } else {
            const expected = element.expected
            test(`${testFunction}(${JSON.stringify(element.test)}, ${JSON.stringify(element.format)}) to equal ${JSON.stringify(expected)}`, () => {
              expect(functions[testFunction](expected, element.format)).toEqual(expected)
            })
          }
        } else if (testFunction === 'popular') {
          const expected = element[Object.keys(element)[0]]
          test(`${testFunction}() to be array containing ${JSON.stringify(expected)}`, () => {
            expect(functions[testFunction]()).toEqual(expect.arrayContaining(expected))
          })
          test(`${testFunction}(-10, 200) to be array containing ${JSON.stringify(expected)}`, () => {
            expect(functions[testFunction](0, 200)).toEqual(expect.arrayContaining(expected))
          })
        } else if (testFunction === 'syntax') {
          if (element[Object.keys(element)[0]] === 'all') {
            functions.properties.forEach((property) => {
              testSyntax(property)
            })
          } else {
            testSyntax(element[Object.keys(element)[0]])
          }
        } else {
          const webAnimationsAPI = testCase === 'true' ? [] : [false]
          Object.keys(element).forEach(function (property) {
            test(`${testFunction}('${property}'${webAnimationsAPI.length ? ', ' + webAnimationsAPI.join() : ''}) to equal ${JSON.stringify(element[property])}`, () => {
              expect(functions[testFunction](property, ...webAnimationsAPI)).toBe(element[property])
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
