import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

export default defineConfig([
  {
    plugins: [typescript()],
    external: ['@swc/core', '@rollup/pluginutils', 'postcss', 'path', 'fs'],
    input: './src/index.ts',
    output: {
      dir: './dist',
      format: 'es',
    },
  },
  {
    plugins: [dts()],
    input: './src/index.ts',
    output: {
      dir: './dist',
      format: 'es',
    },
  },
])
