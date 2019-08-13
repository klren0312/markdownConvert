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
  let sum = 0 // 用于 markdown 文件计数
  const total = files.length // 总文件数
  files.forEach(file => { // 遍历文件
    sum++
    const fileName = file.match(/(.*)\.[^.]+$/)[1] // 提取文件名 test.md => test
    fs.createReadStream(path.resolve(`${mdFolder}/${file}`)) // 创建读取操作的数据流
      .pipe(mtp()) // 转换成pdf数据流
      .pipe(fs.createWriteStream(path.resolve(`${pdfFolder}/${fileName}.pdf`))) // 写入文件
    console.log(`${file} => ${fileName}.pdf 成功, 当前转换进度 ${sum} / ${total}`)
  })
})
