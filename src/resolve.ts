import * as path from 'path'
import { fileExists, directoryExists } from './utils.js'

export async function resolveImport(
  source: string,
  { importer, extensions = [] }: { importer?: string; extensions: string[] }
): Promise<string | undefined> {
  if (!importer) return
  //判断是不是在node_module引入
  if (source[0] !== '.') return
  const sourceExt = path.extname(source)
  //如果扩展名为空，判断是否为文件夹，如果是文件中则去找index，如果不是文件夹添加扩展名去找文件
  const sourcePath = path.resolve(path.dirname(importer), source)
  if (sourceExt === '') {
    return (await directoryExists(sourcePath))
      ? findFileWithExtensions(sourcePath, extensions, true)
      : findFileWithExtensions(sourcePath, extensions)
  }
  return sourcePath
}

async function findFileWithExtensions(
  p: string,
  extensions: string[],
  module = false
): Promise<string | undefined> {
  for (const ext of extensions) {
    const filePath = module ? path.resolve(p, `index${ext}`) : `${p}${ext}`
    if (await fileExists(filePath)) {
      return filePath
    }
  }
  return
}
