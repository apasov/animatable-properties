import animatable from './properties'

export default {
    properties: animatable.properties.map(val => animatable.cssToJs(val)),
    propertiesCSS: animatable.properties,
    propertiesJS: animatable.properties.map(val => animatable.cssToJs(val, false)),
    cssToJs: animatable.cssToJs,
    isAnimatable: (value) => {
        let property = value.toLowerCase()
        if (property.substr(0, 3) === 'css') {
            property = property.substr(3)
        }
        if (animatable.properties.includes(property)) {
            return true
        }
        property = property.replace(/-/g, '')
        for (const prop of animatable.properties) {
            if (property === prop.replace(/-/g, '')) {
                return true
            }
        }
        return false
    }
}


