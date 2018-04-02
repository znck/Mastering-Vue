#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const marked = require('marked')
const escape = require('escape-html')
const child = require('child_process')

const renderer = new marked.Renderer();

renderer.code = (code, language) => `<pre>${escape(code)}\n</pre>\n`
renderer.blockquote = (quote) => `<blockquote>${quote}</blockquote>\n`
renderer.html = (html) => `${html}\n`
renderer.heading = (text, level) => {
  if (level == 1) return `<!-- Title: ${text} -->\n`
  if (level <= 5) return `<h${level - 1}>${text}</h${level - 1}>\n`

  return `<p><strong>${text}</strong></p>`
}
renderer.hr = () => `<hr />\n`
renderer.list = (body, ordered) => `<${ordered ? 'ol' : 'ul'}>${body}</${ordered ? 'ol' : 'ul'}>\n`
renderer.listitem = (text) => `<li>${text}</li>\n`
renderer.paragraph = (text) => `<p>${text}</p>\n`
// renderer.table = (header, body)
// renderer.tablerow(string content)
// renderer.tablecell(string content, object flags)

// renderer.strong(string text)
// renderer.em(string text)
renderer.codespan = (code) => `<kbd>${code}</kbd>`
// renderer.br()
// renderer.del(string text)
// renderer.link(string href, string title, string text)
// renderer.image(string href, string title, string text)
// renderer.text(string text)

function n(any) {
  return any.replace(/[ ]/g, '\\ ')
}

const cssPath = path.resolve(__dirname, 'style.css')
fs.readdirSync(__dirname)
  .filter(it => it.startsWith('Chapter'))
  .map(it => path.resolve(__dirname, it))
  .reduce((acc, it) => acc.concat(
    fs.readdirSync(it)
      .filter(f => /\.md$/.test(f))
      .map(f => path.resolve(it, f))
  ), [])
  .forEach(it => {
    const input = fs.readFileSync(it).toString()
    const inputDirectory = path.dirname(it)
    const output = marked(input, { renderer })
    const outputDirectory = path.join(inputDirectory, 'dist')
    const target = path.join(outputDirectory, path.basename(it).replace(/\.md$/, '.html'))

    if (!fs.existsSync(outputDirectory)) fs.mkdirSync(outputDirectory)
    child.execSync(`cp -a ${n(path.join(inputDirectory, 'assets'))} ${n(path.join(outputDirectory, 'assets'))}`)
    child.execSync(`cp ${n(cssPath)} ${n(path.join(outputDirectory, 'style.css'))}`)
    console.log('> ' + path.basename(it))
    fs.writeFileSync(target, 
`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${path.basename(it).replace(/\.md$/, '')}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="style.css" />
</head>
<body>
<!-- GENERATED CONTENT -->
${output}
</body>
</html>`)
  })