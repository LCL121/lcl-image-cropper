import pkg from '../package.json'

export const productionOutput = [
  {
    file: `./dist/${pkg.name}.min.js`,
    format: 'umd',
    name: 'LCLImageCropper',
    sourcemap: true
  },
  {
    file: `./dist/${pkg.name}.common.min.js`,
    format: 'cjs',
    name: 'LCLImageCropper',
    sourcemap: true,
    exports: 'default'
  },
  {
    file: `./dist/${pkg.name}.min.mjs`,
    format: 'esm',
    name: 'LCLImageCropper',
    sourcemap: true
  }
]

export const developmentOutput = {
  file: './dev/js/iife/LCLImageCropper.js',
  format: 'iife',
  name: 'LCLImageCropper',
  sourcemap: true
}

export const cssOutput = [
  {
    file: './dist/lcl-image-cropper.css.js',
    format: 'umd'
  }
]
