# Animatable CSS properties

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![](https://img.shields.io/npm/v/animatable-properties.svg)](https://www.npmjs.com/package/animatable-properties)
[![](https://img.shields.io/bundlephobia/minzip/animatable-properties.svg)](https://bundlephobia.com/result?p=animatable-properties)

List of animatable CSS properties for use with [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API), JavaScript and CSS.

It is based on the [MDN animatable CSS properties list](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties) minus vendor-prefixed properties.

For use with Web Animations API "float" must be written as "cssFloat" and "offset" as "cssOffset". [Reference](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats)

Two helper functions included: `cssToJs()` and `isAnimatable()`. Explanation below. 

## Install

```
$ yarn add animatable-properties
```
or
```
$ npm install animatable-properties
```


## Usage

```js
//
// Import all functionality into one object:
//

import * as animatable from 'animatable-properties'

//
// Or import only what you need:
//

import { properties, propertiesCSS, propertiesJS, cssToJs, isAnimatable } from 'animatable-properties'

//
// Or load from CDN
//

<script src="https://cdn.jsdelivr.net/npm/animatable-properties@latest/dist/animatable.js"></script>

//
// Arrays containing all animatable properties in various formats.
//

animatable.properties
//=> Array ["all", "backdropFilter", "background", "backgroundColor", …]
// Web Animations API style => camelCase, "offset" becomes "cssOffset"

animatable.propertiesCSS
//=> Array ["all", "backdrop-filter", "background", "background-color", …]
// CSS style => kebab-case

animatable.propertiesJS
//=> Array ["all", "backdropFilter", "background", "backgroundColor", …]
// JavaScript style => camelCase, "offset" remains "offset"

//
// Use cssToJs() to convert property names from CSS format to Web Animations API or Javascript format. 
//

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

//
// Use isAnimatable() to detect if a property is animatable.
// The argument can be in any of the three formats and case insensitive.
//

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

