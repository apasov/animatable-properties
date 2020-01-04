import animatable from './properties'

export default {
    properties: animatable.properties.map(val => animatable.cssToJs(val)),
    propertiesCSS: animatable.properties,
    propertiesJS: animatable.properties.map(val => animatable.cssToJs(val, false)),
    cssToJs: animatable.cssToJs
}


