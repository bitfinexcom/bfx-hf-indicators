const path = require('path')
const { promises: fs } = require('fs')
const _template = require('lodash/template')
const jsDoc2MD = require('jsdoc-to-markdown')
const { getLogger } = require('serve-markdown-it-lib')

/**
 * @private
 * @param {string} p - path
 * @returns {string} path - returns final render path for readme/docs
 */
const getPath = p => path.join(__dirname, '../', p)

const TEMPLATE_SRC = '.README.md'
const TEMPLATE_DST = 'README.md'
const API_SRC = ['*.js', 'lib/**'].map(getPath)

const l = getLogger('gen-readme')

jsDoc2MD.render({ files: API_SRC }).then(async (api) => {
  const templatePath = getPath(TEMPLATE_SRC)
  const templateSrc = await fs.readFile(templatePath, 'utf-8')
  const template = _template(templateSrc)
  const readme = template({ api })
  const dst = getPath(TEMPLATE_DST)

  await fs.writeFile(dst, readme)

  l.success('rendered %s', dst)

  return false
}).catch((e) => {
  l.error('%s', e.stack)
})
