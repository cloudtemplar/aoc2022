import fs from 'fs'

export function readLines (filePath: string): string[] {
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return fileContents.split(/\r?\n/)
}
