# Animatable CSS properties
List of animatable CSS properties for use with [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).

It is based on the [MDN animatable CSS properties list](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties) minus vendor-prefixed properties.

For use with Web Animations API "float" must be written as "cssFloat" and "offset" as "cssOffset". [Reference](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats)

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
import animatable from 'animatable-properties'

animatable.properties
//=> Array ["all", "backdropFilter", "background", "backgroundColor", …]
// Web Animations API style => camelCase, "offset" becomes "cssOffset"

animatable.propertiesCSS
//=> Array ["all", "backdrop-filter", "background", "background-color", …]
// CSS style => kebab-case

animatable.propertiesJS
//=> Array ["all", "backdropFilter", "background", "backgroundColor", …]
// JavaScript style => camelCase, "offset" remains "offset"

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

