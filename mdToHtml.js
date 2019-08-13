const showdown = require('showdown')
const converter = new showdown.Converter()
converter.setFlavor('github')
const fs = require('fs')
const path = require('path')
const rm = require('rimraf')

const mdFolder = 'markdown' // md目录
const htmlFolder = 'html' // html目录

rm.sync(path.resolve(htmlFolder)) // 删除html文件夹
if (!fs.existsSync(htmlFolder)) {
  fs.mkdirSync(htmlFolder) // 新建html文件夹
}
fs.readdir(path.resolve(mdFolder), (err, files) => { // 读取md文件夹文件列表
  if (err) throw err
  let sum = 0 // 用于 markdown 文件计数
  const total = files.length // 总文件数
  files.forEach(file => { // 遍历文件
    sum++
    const fileName = file.match(/(.*)\.[^.]+$/)[1] // 提取文件名 test.md => test
    fs.readFile(path.resolve(`${mdFolder}/${file}`), 'utf8', (err, data) => { // 读取文件
      if (err) {
        console.error(err)
        return
      }
      const htmlContent = converter.makeHtml(data) // md 转成 html
      fs.writeFile(path.resolve(`${htmlFolder}/${fileName}.html`), htmlContent, 'utf8', (err) => { // 写入到html文件
        if (err) throw err;
        console.log(`${file} => ${fileName}.html 成功, 当前转换进度 ${sum} / ${total}`)
      })
    })
  })
})
