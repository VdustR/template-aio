/**
 * This script is used to generate ignore files for tools other than git and
 * each package.
 */
import fastGlob from 'fast-glob'
import fs from 'fs-extra'
import path from 'pathe'
import prependFile from 'prepend-file'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const repoDirname = path.resolve(__dirname, '..')

await fs.copy('.gitignore', '.eslintignore')

/**
 * Dot files are ignored by eslint by default. We want to lint them.
 */
await prependFile(path.resolve(repoDirname, '.eslintignore'), '!.*\n')

await fs.copy('.gitignore', '.prettierignore')

/**
 * Use `@antfu/eslint-config` instead of `prettier` for formatting.
 */
await fs.appendFile(
  path.resolve(repoDirname, '.prettierignore'),
  [
    '*.js',
    '*.jsx',
    '*.ts',
    '*.tsx',
    '*.vue',
    '*.json',
    '*.jsonc',
    '*.yml',
    '*.yaml',
    '*.toml',
  ].map(rule => `${rule}\n`).join(''),
)

const ignoreFiles = await fastGlob('.*ignore', {
  cwd: repoDirname,
  dot: true,
  onlyFiles: true,
  ignore: ['.gitignore'],
})

const packagePaths = (
  await fastGlob('**/package.json', {
    cwd: repoDirname,
    ignore: ['**/node_modules/**', 'package.json'],
  })
).map(packagePath => path.join(repoDirname, path.dirname(packagePath)))

function guessEol(content: string) {
  const crCount = (content.match(/\r/g) || []).length
  const lfCount = (content.match(/\n/g) || []).length
  const crlfCount = (content.match(/\r\n/g) || []).length
  if (crlfCount > crCount && crlfCount > lfCount)
    return '\r\n'

  if (crCount > lfCount && crCount > crlfCount)
    return '\r'

  return '\n'
}

packagePaths.forEach((packagePath) => {
  const packageDirs = `/${packagePath}`.split('/')
  async function fixPath(filePath: string) {
    const content = await fs.readFile(filePath, 'utf8')
    const eol = guessEol(content)
    const lines = content.split(eol)
    const fixedLines = lines.flatMap((line) => {
      // Keep the comment
      if (line.startsWith('#'))
        return [line]
      // Keep if empty line or spaces line
      if (line.trim() === '')
        return [line]
      // Keep if the path is not in the package
      const absolutePath = line.replace(/^!/, '')
      const dirs = absolutePath.split('/')
      // Keep if the path is not for specific dir
      if (dirs[0] !== '')
        return [line]
      // Not in this dir
      for (let i = 0; i < packageDirs.length; i++) {
        if (packageDirs[i] && dirs[i] !== packageDirs[i])
          return [line]
      }

      // Remove the package path
      const fixedPath = line.replace(
        new RegExp(`^(!?)/${packagePath}/`),
        '$1/',
      )
      return [fixedPath]
    })
    await fs.writeFile(filePath, fixedLines.join(eol))
  }
  const packageDirname = path.resolve(repoDirname, packagePath)
  ignoreFiles.forEach(async (ignoreFile) => {
    const ignoreFileBasename = path.basename(ignoreFile)
    const ignoreFileTarget = path.resolve(packageDirname, ignoreFileBasename)
    await fs.copy(ignoreFile, ignoreFileTarget)
    await fixPath(ignoreFileTarget)
  })
})
