import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import * as pkg from './package.json'

const name = 'animatable'

export default {
  input: pkg.main,
  output: {
    file: `dist/${name}.js`,
    format: 'umd',
    name: name,
    sourcemap: true,
  },
  plugins: [
    commonjs(),
    json(),
    resolve(),
    terser({
      output: {
        preamble: `//${pkg.name} v${pkg.version} ${pkg.homepage}`,
      },
    }),
  ],
}
