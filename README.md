# Animatable CSS properties

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![](https://img.shields.io/npm/v/animatable-properties.svg)](https://www.npmjs.com/package/animatable-properties)
[![](https://img.shields.io/bundlephobia/minzip/animatable-properties.svg)](https://bundlephobia.com/result?p=animatable-properties)

[DEMO](https://apasov.github.io/animatable-properties/) and its [source code](https://github.com/apasov/animatable-properties/blob/master/index.html).

List of animatable CSS properties for use with [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API), JavaScript and CSS.

It is based on the [MDN animatable CSS properties list](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties) minus vendor-prefixed properties.

For use with Web Animations API "float" must be written as "cssFloat" and "offset" as "cssOffset". [Reference](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats)

Two helper functions included: `cssToJs()` and `isAnimatable()`. Explanation below. 

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
import { properties, propertiesCSS, propertiesJS, cssToJs, isAnimatable } from 'animatable-properties'
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
Use `cssToJs` method to convert property names from CSS format to Web Animations API or Javascript format: 
```javascript

animatable.cssToJs('grid-column-gap')
//=> 'gridColumnGap'

animatable.cssToJs('float')
//=> 'cssFloat'

animatable.cssToJs('float', false)
//=> 'float'

animatable.cssToJs('offset')
//=> 'cssOffset'

animatable.cssToJs('offset', false)
//=> 'offset'
```
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
# Development

Build the bundle for browsers into `./dist` folder:
```shell script
yarn build
```

Watch. Something like Hot Module Reloading. Rebuild the bundle when its source files change on disk:
```shell script
yarn watch
```

Run tests:
```shell script
yarn test
```

Check coding style (`standard` must be [installed globally](https://github.com/standard/standard#install)):
```shell script
standard
```
