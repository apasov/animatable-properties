//animatable-properties v2.0.4 https://github.com/apasov/animatable-properties#readme
!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r((e=e||self).animatable={})}(this,(function(e){"use strict";var r=["all","backdrop-filter","background","background-color","background-position","background-size","border","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-width","border-color","border-end-end-radius","border-end-start-radius","border-image-outset","border-image-slice","border-image-width","border-left","border-left-color","border-left-width","border-radius","border-right","border-right-color","border-right-width","border-start-end-radius","border-start-start-radius","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-width","border-width","bottom","box-shadow","caret-color","clip","clip-path","color","column-count","column-gap","column-rule","column-rule-color","column-rule-width","column-width","columns","filter","flex","flex-basis","flex-grow","flex-shrink","font","font-size","font-size-adjust","font-stretch","font-variation-settings","font-weight","gap","grid-column-gap","grid-gap","grid-row-gap","grid-template-columns","grid-template-rows","height","inset","inset-block","inset-block-end","inset-block-start","inset-inline","inset-inline-end","inset-inline-start","left","letter-spacing","line-clamp","line-height","margin","margin-bottom","margin-left","margin-right","margin-top","mask","mask-border","mask-position","mask-size","max-height","max-lines","max-width","min-height","min-width","object-position","offset","offset-anchor","offset-distance","offset-path","offset-position","offset-rotate","opacity","order","outline","outline-color","outline-offset","outline-width","padding","padding-bottom","padding-left","padding-right","padding-top","perspective","perspective-origin","right","rotate","row-gap","scale","scroll-margin","scroll-margin-block","scroll-margin-block-end","scroll-margin-block-start","scroll-margin-bottom","scroll-margin-inline","scroll-margin-inline-end","scroll-margin-inline-start","scroll-margin-left","scroll-margin-right","scroll-margin-top","scroll-padding","scroll-padding-block","scroll-padding-block-end","scroll-padding-block-start","scroll-padding-bottom","scroll-padding-inline","scroll-padding-inline-end","scroll-padding-inline-start","scroll-padding-left","scroll-padding-right","scroll-padding-top","scroll-snap-coordinate","scroll-snap-destination","scrollbar-color","shape-image-threshold","shape-margin","shape-outside","tab-size","text-decoration","text-decoration-color","text-decoration-thickness","text-emphasis","text-emphasis-color","text-indent","text-shadow","text-underline-offset","top","transform","transform-origin","translate","vertical-align","visibility","width","word-spacing","z-index","zoom"];const t=(e,r)=>{if("string"!=typeof e&&!Array.isArray(e))throw new TypeError("Expected the input to be `string | string[]`");r=Object.assign({pascalCase:!1},r);return 0===(e=Array.isArray(e)?e.map(e=>e.trim()).filter(e=>e.length).join("-"):e.trim()).length?"":1===e.length?r.pascalCase?e.toUpperCase():e.toLowerCase():(e!==e.toLowerCase()&&(e=(e=>{let r=!1,t=!1,o=!1;for(let i=0;i<e.length;i++){const s=e[i];r&&/[a-zA-Z]/.test(s)&&s.toUpperCase()===s?(e=e.slice(0,i)+"-"+e.slice(i),r=!1,o=t,t=!0,i++):t&&o&&/[a-zA-Z]/.test(s)&&s.toLowerCase()===s?(e=e.slice(0,i-1)+"-"+e.slice(i-1),o=t,t=!1,r=!0):(r=s.toLowerCase()===s&&s.toUpperCase()!==s,o=t,t=s.toUpperCase()===s&&s.toLowerCase()!==s)}return e})(e)),e=e.replace(/^[_.\- ]+/,"").toLowerCase().replace(/[_.\- ]+(\w|$)/g,(e,r)=>r.toUpperCase()).replace(/\d+(\w|$)/g,e=>e.toUpperCase()),t=e,r.pascalCase?t.charAt(0).toUpperCase()+t.slice(1):t);var t};var o=t,i=t;o.default=i;var s=(e,r=!0)=>{let t=e.toLowerCase();return r&&("float"!==t&&"offset"!==t||(t="css-"+t)),o(t)},a=e=>{let t=e.toLowerCase();if("css"===t.substr(0,3)&&(t=t.substr(3)),r.includes(t))return!0;t=t.replace(/-/g,"");for(const e of r)if(t===e.replace(/-/g,""))return!0;return!1},n={properties:r.map(e=>s(e)),propertiesCSS:r,propertiesJS:r.map(e=>s(e,!1))};const l=n.properties,d=n.propertiesCSS,c=n.propertiesJS,p=s,g=a;e.cssToJs=p,e.isAnimatable=g,e.properties=l,e.propertiesCSS=d,e.propertiesJS=c,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=animatable.js.map
