const puppeteer = require('puppeteer')
const numberOfProperties = require(`../dist/animatable.js`).properties.length
const properties = ['opacity', 'transform', 'background-color', 'color', 'visibility', 'width', 'border-bottom-color', 'border-top-color', 'border-left-color', 'border-right-color', 'box-shadow', 'top', 'height', 'left', 'bottom']

;(async () => {
  let _property = ''
  let _error = ''
  const selector = '#propertySelect input:first-child'
  let inputValue = ''
  let i = 0
  const headless = true
  const browser = await puppeteer.launch({ headless: headless })
  const page = await browser.newPage()
  page.on('console', (msg) => {
    _error = msg
    process.stdout.write(`\nProperty: ${_property}\n`)
    process.stdout.write(`\nError: `)
    console.log(msg)
  })

  await page.goto(`file:${require('path').join(__dirname, '..', 'index.html')}`)
  const input = await page.waitForSelector(selector)
  await page.focus(selector)

  for (const property of properties) {
    if (_error) break
    _property = property
    await page.keyboard.down('Control')
    await page.keyboard.press('A')
    await page.keyboard.up('Control')
    await page.keyboard.press('Backspace')
    await page.keyboard.type(property)
    i = 0
    while (inputValue !== property) {
      i++
      await page.keyboard.press('ArrowDown')
      await page.waitFor(100)
      inputValue = await page.evaluate((x) => x.value, input)
      await page.waitFor(100)
      if (i > numberOfProperties) {
        console.log('Invalid property: ' + property)
        break
      }
    }
    await page.keyboard.press('Enter')
    await page.waitFor(100)
    const cssProperty = await page.evaluate((el) => el.innerHTML, await page.$('#cssProperty'))
    if (cssProperty !== property) {
      console.log('Invalid property: ' + property)
      break
    }
  }

  try {
    await browser.close()
  } catch (err) {
    console.error(err)
  }
})()
