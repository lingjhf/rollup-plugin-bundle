import { promises as fsPromise } from 'fs'

export async function fileExists(path: string) {
  return fsPromise
    .access(path)
    .then(() => true)
    .catch(() => false)
}

export async function directoryExists(path: string) {
  return fsPromise
    .stat(path)
    .then((stat) => stat.isDirectory())
    .catch(() => false)
}
