# Animatable CSS properties

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![](https://img.shields.io/npm/v/animatable-properties.svg)](https://www.npmjs.com/package/animatable-properties)
[![](https://img.shields.io/bundlephobia/minzip/animatable-properties.svg)](https://bundlephobia.com/result?p=animatable-properties)
[![Dependencies Status](https://david-dm.org/apasov/animatable-properties.svg?theme=shields.io)](https://david-dm.org/apasov/animatable-properties)
[![devDependencies Status](https://david-dm.org/apasov/animatable-properties/dev-status.svg?theme=shields.io)](https://david-dm.org/apasov/animatable-properties?type=dev)
[![codecov](https://codecov.io/gh/apasov/animatable-properties/branch/master/graph/badge.svg)](https://codecov.io/gh/apasov/animatable-properties)
[![Build Status](https://travis-ci.org/apasov/animatable-properties.svg?branch=master)](https://travis-ci.org/apasov/animatable-properties)

[DEMO](https://apasov.github.io/animatable-properties/) and its [source code](https://github.com/apasov/animatable-properties/blob/master/index.html).

List of animatable CSS properties and their syntax with possibility of validation and sanitization for use with [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API), JavaScript and CSS.

It is based on the [MDN animatable CSS properties list](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties) minus vendor-prefixed properties. The properties and their syntax are fetched from [mdn-data](https://www.npmjs.com/package/mdn-data). Validation and sanitation are based on [css-tree](https://github.com/csstree/csstree).

For use with Web Animations API "float" must be written as "cssFloat" and "offset" as "cssOffset". [Reference](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats)

Functions included: `cssToJs()`, `jsToCss()`, `isAnimatable()`, `popular()`, `syntax()`, `validate()`, `sanitize()`. Explanation below.

## Install

```shell script
$ yarn add animatable-properties
```

or

```shell script
$ npm install animatable-properties
```

## Usage

Import all functionality into one object:

```javascript
import * as animatable from 'animatable-properties'
```

Or import only what you need:

```javascript
import { properties, propertiesCSS, propertiesJS, cssToJs, jsToCss, isAnimatable } from 'animatable-properties'
```

Or load from CDN:

```html
<!-- Either -->
<script src="https://unpkg.com/animatable-properties"></script>
<!-- or -->
<script src="https://cdn.jsdelivr.net/npm/animatable-properties@latest/dist/animatable.js"></script>
```

Arrays containing all animatable properties in various formats:

```javascript
animatable.properties
//=> Array ["all", "backdropFilter", "background", "backgroundColor", …]
// Web Animations API style => camelCase, "offset" becomes "cssOffset"

animatable.propertiesCSS
//=> Array ["all", "backdrop-filter", "background", "background-color", …]
// CSS style => kebab-case

animatable.propertiesJS
//=> Array ["all", "backdropFilter", "background", "backgroundColor", …]
// JavaScript style => camelCase, "offset" remains "offset"
```

#### cssToJs()

Use `cssToJs` method to convert property names from any format to Web Animations API or Javascript format:

```javascript
animatable.cssToJs('grid-column-gap')
//=> 'gridColumnGap'

animatable.cssToJs('float')
//=> ''
// returns empty string because 'float' is not an animatable property

animatable.cssToJs('offset')
//=> 'cssOffset'

animatable.cssToJs('offset', false)
//=> 'offset'
```

#### jsToCss()

Use `jsToCss` method to convert property names from any format to CSS format:

```javascript
animatable.jsToCss('gridColumnGap')
//=> 'grid-column-gap'
```

Or universaly convert string from any format to any using `sanitize()` with second argument (which by default is `'waapi'`):

```javascript
animatable.sanitize('grid-column-gap')
//=> 'gridColumnGap'

animatable.sanitize('offset')
//=> 'cssOffset'

animatable.sanitize('offset', 'js')
//=> 'offset'

animatable.sanitize('gridColumnGap', 'css')
//=> 'grid-column-gap'
```

#### isAnimatable()

Use `isAnimatable` method to detect if a property is animatable.
The argument can be in any of the three formats and case insensitive.

```javascript
animatable.isAnimatable('grid-column-gap')
//=> true

animatable.isAnimatable('gridCoLumnGap')
//=> true

animatable.isAnimatable('grId-coLumn-GAP')
//=> true

animatable.isAnimatable('grIdcoLumnGAP')
//=> true

animatable.isAnimatable('float')
//=> false

animatable.isAnimatable('cssFloat')
//=> false

animatable.isAnimatable('offset')
//=> true

animatable.isAnimatable('cssOffset')
//=> true
```

`isAnimatable` has an optional argument:

```javascript
animatable.isAnimatable(stringToCheck, (returnCssProperty = false))
```

If `returnCssProperty` is `true` then `animatable.isAnimatable()` returns the CSS property instead of `true` if it's valid and an empty string instead of `false` if invalid:

```javascript
animatable.isAnimatable('gridCoLumnGap', true)
//=> 'grid-column-gap'

animatable.isAnimatable('textdecorationTHICKNess', true)
//=> 'text-decoration-thickness'

animatable.isAnimatable('textdecorrationTHICKNess', true)
//=> ''
```

`jsToCss()` is an alias of `isAnimatable(stringToCheck, true)`.

#### popular()

With `popular()` you can get array of animatable properties sorted by their usage popularity according to Chrome's anonymous usage statistics:
https://chromestatus.com/metrics/css/animated

```javascript
animatable.popular((start = 0), (end = 10))

animatable.popular()
// Array(10) [ "opacity", "transform", "background-color", "color", "visibility", "width", "border-bottom-color", "border-top-color", "border-left-color", "border-right-color" ]

animatable.popular(10, 21)
// Array(11) [ "top", "height", "box-shadow", "left", "bottom", "font-size", "outline-color", "outline-width", "background-size", "border-bottom-width", "padding-top" ]
```

#### syntax()

Use `syntax(string)` to get syntax for a specific property. It returns an object of the following structure:
![image](https://user-images.githubusercontent.com/60752454/81773906-abde8800-94e9-11ea-9cc1-d45a6f8326ba.png)

Where:

- `main` is a string containing main syntax of the property.
- `links` is an object with links to MDN documenting syntaxes not explained in `key => value` pairs
- `key => value` pairs explaining main syntax.
- `order` is an array defining order in which `key => value` pairs are recommended to be listed.

View [demo source](https://github.com/apasov/animatable-properties/blob/master/index.html) for code examples of how to work with the syntax object.

For example:

![image](https://user-images.githubusercontent.com/60752454/81773399-76856a80-94e8-11ea-9e21-c14a1cd2349e.png)

Another example:

![image](https://user-images.githubusercontent.com/60752454/81774608-49868700-94eb-11ea-924e-ef27caa81a66.png)

#### validate()

`validate(objectToValidate, returnError = true)`

Validates object of `key => value` pairs, where `key` is a CSS property in any of the 3 formats (WAAPI, JS or CSS) and `value` is its value.
Returns `true` or `error` object which is default. Or `true` or `false` if the second argument `returnError` is `false`.

View [demo source](https://github.com/apasov/animatable-properties/blob/master/index.html) for code examples of how to handle the error object.

Example:

![image](https://user-images.githubusercontent.com/60752454/81775351-fe6d7380-94ec-11ea-8dd7-126c4e480a35.png)

#### sanitize()

`sanitize(objectArrayOrString, format = 'waapi')`

It takes an object of `key => value` pairs, an array of strings or a string and returns a sanitized object, array or string containing the input object with invalid elements removed.

See [DEMO](https://apasov.github.io/animatable-properties/) for exapmles.

# Development

Build the bundle for browsers into `./dist` folder:

```shell script
yarn build
```

Watch. Rebuild the bundle when its source files change on disk:

```shell script
yarn watch
```

Run tests:

```shell script
yarn test
```

Lint:

```shell script
yarn lint
```

Fix linting and style errors:

```shell script
yarn fix
```

Update dependencies:

```shell script
yarn up
```
