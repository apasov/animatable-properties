import arrays from "./arrays"
import functions from "./functions"

export default {
    properties: arrays.properties,
    propertiesCSS: arrays.propertiesCSS,
    propertiesJS: arrays.propertiesJS,
    cssToJs: functions.cssToJs,
    isAnimatable: functions.isAnimatable
}

export const properties = arrays.properties
export const propertiesCSS = arrays.propertiesCSS
export const propertiesJS = arrays.propertiesJS
export const cssToJs = functions.cssToJs
export const isAnimatable = functions.isAnimatable
