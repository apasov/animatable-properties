import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import * as pack from './package.json'

const name = 'animatable'

export default {
  input: 'index.js',
  output: {
    file: `dist/${name}.js`,
    format: 'iife',
    name: name,
    sourcemap: true
  },
  plugins: [resolve(), commonjs(), terser({
    output: {
      preamble: `//${pack.name} v${pack.version} ${pack.repository}`
    }
  })]
}
