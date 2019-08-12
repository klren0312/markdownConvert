const mtp = require('markdown-pdf')
const fs = require('fs')
const path = require('path')
const rm = require('rimraf')

const mdFolder = 'markdown' // md目录
const pdfFolder = 'pdf' // pdf目录

rm.sync(path.resolve(pdfFolder)) // 删除pdf文件夹
if (!fs.existsSync(pdfFolder)) {
  fs.mkdirSync(pdfFolder); // 新建pdf文件夹
}
fs.readdir(path.resolve(mdFolder), (err, files) => { // 读取md文件夹文件列表
  if (err) throw err
  let sum = 0
  const total = files.length
  files.forEach(file => {
    sum++
    const fileName = file.match(/(.*)\.[^.]+$/)[1]
    fs.createReadStream(path.resolve(`${mdFolder}/${file}`))
      .pipe(mtp())
      .pipe(fs.createWriteStream(path.resolve(`${pdfFolder}/${fileName}.pdf`)))
    console.log(`${file} => ${fileName}.pdf 成功, 当前转换进度 ${sum} / ${total}`)
  })
})
