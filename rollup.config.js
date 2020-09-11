import path from 'path'
import fs from 'fs'

import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import clear from 'rollup-plugin-clear'
import copy from 'rollup-plugin-copy'
import { terser } from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import postcss from 'rollup-plugin-postcss'

import autoprefixer from 'autoprefixer'
import postcssPresetEnv from 'postcss-preset-env'
import postcssModules from 'postcss-modules'
import cssnano from 'cssnano'

const commonPlugins = [
  copy({
    targets: [
      { src: './public/*', dest: './dist' }
    ]
  }),
  json(),
  typescript(),
  nodeResolve(),
  commonjs(),
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'runtime'
  }),
  postcss({
    plugins: [
      autoprefixer(),
      cssnano(),
      postcssPresetEnv(),
      postcssModules({
        getJSON: function (cssFileName, json, outputFileName) {
          const cssName = path.basename(cssFileName, '.css')
          const jsonFileName = path.resolve('./src/styleJson/' + cssName + '.json')
          fs.writeFileSync(jsonFileName, JSON.stringify(json))
        },
        generateScopedName: '[name]__[local]__[hash:base64:5]'
      })
    ]
  })
]

const productionPlugins = [
  clear({
    targets: [path.resolve(__dirname, './dist')]
  }),
  terser()
]

const developmentPlugins = [
  serve({
    open: true,
    port: 8888,
    contentBase: 'dist'
  }),
  livereload('dist')
]

const productionOutput = {
  file: './dist/js/iife/LCLImageCropper.min.js',
  format: 'iife',
  name: 'LCLImageCropper',
  sourcemap: true
}

const developmentOutput = {
  file: './dist/js/iife/LCLImageCropper.js',
  format: 'iife',
  name: 'LCLImageCropper',
  sourcemap: true
}

let addPlugins = []
let output = developmentOutput

if (process.env.NODE_ENV === 'production') {
  addPlugins = productionPlugins
  output = productionOutput
} else if (process.env.NODE_ENV === 'development') {
  addPlugins = developmentPlugins
}

let input = './src/index.ts'

if (process.env.NODE_ENV === 'test') {
  input = './src/test.ts'
  addPlugins = developmentPlugins
}

if (process.env.NODE_ENV === 'css') {
  input = './src/index.css.ts'
}

export default {
  input,
  output,
  plugins: commonPlugins.concat(...addPlugins)
}
