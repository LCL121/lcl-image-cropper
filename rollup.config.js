import { commonPlugins, developmentPlugins, productionPlugins } from './config/plugins'
import { productionOutput, developmentOutput, cssOutput } from './config/outputs'

let addPlugins = []
let output = developmentOutput
let input = './src/index.ts'

if (process.env.NODE_ENV === 'production') {
  addPlugins = productionPlugins
  output = productionOutput
} else if (process.env.NODE_ENV === 'development') {
  addPlugins = developmentPlugins
} else if (process.env.NODE_ENV === 'test') {
  input = './src/test.ts'
  addPlugins = developmentPlugins
} else if (process.env.NODE_ENV === 'css') {
  input = './src/index.css.ts'
  output = cssOutput
}

export default {
  input,
  output,
  plugins: commonPlugins.concat(...addPlugins)
}
