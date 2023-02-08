import { NormalizedOutputOptions, OutputBundle, OutputChunk, Plugin } from 'rollup'
import * as swc from '@swc/core'
import { createFilter } from '@rollup/pluginutils'
import * as postcss from 'postcss'
import { resolveImport } from './resolve.js'

const EXTENSIONS = ['.ts', '.js', '.jsx', '.tsx', '.cjs', '.mjs']

export type Options = {
  swcOptions: swc.Options
}

export function bundle(options: Options): Plugin {
  const styles: { [key: string]: string } = {}
  const chunkFilter = createFilter(['**/*.ts'])
  const assetFilter = createFilter(['**/*.css'])
  return {
    name: 'bundle',
    async resolveId(source: string, importer?: string) {
      const resolved = await resolveImport(source, { importer: importer, extensions: EXTENSIONS })
      return resolved
    },
    async transform(code, id) {
      if (chunkFilter(id)) {
        const swcOutput = await swc.transform(code, {
          jsc: { parser: { syntax: 'typescript' } },
        })
        return {
          code: swcOutput.code,
        }
      }
      if (assetFilter(id)) {
        const cssInput = new postcss.Input(code)
        styles[id] = cssInput.css
        return ''
      }
    },

    generateBundle(options: NormalizedOutputOptions, bundle: OutputBundle) {
      for (const id in styles) {
        const res = id.replace(`${options.preserveModulesRoot}`, '').replace(/^[\/\\]?/, '')
        this.emitFile({
          type: 'asset',
          fileName: res,
          source: styles[id],
        })
      }
    },
  }
}
