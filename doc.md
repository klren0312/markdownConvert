# markdown 转 pdf 以及 mardown 转 html
> 项目地址: https://github.com/klren0312/markdownConvert

## 1.markdown 转 pdf
### 1.使用第三方库

 - markdown-pdf
 - rimraf

### 2.代码解读
1.引入库
```js
const mtp = require('markdown-pdf')
const fs = require('fs')
const path = require('path')
const rm = require('rimraf')
```

2.初始化文件目录
需要将存在的 pdf 目录清除重建

```js
const mdFolder = 'markdown' // md目录
const pdfFolder = 'pdf' // pdf目录

rm.sync(path.resolve(pdfFolder)) // 删除pdf文件夹
if (!fs.existsSync(pdfFolder)) {
  fs.mkdirSync(pdfFolder); // 新建pdf文件夹
}
```

3.生成 pdf 文件
循环读取 mardown 文件夹中文件, 读取 markdown 文件流, 并转换为pdf数据流, 最后存入 pdf 文件中
```js
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
```

## mardown 转 html
### 1.使用第三方库

 - showdown
 - rimraf

### 2.代码解读
1.引入库
```js
const showdown = require('showdown')
const converter = new showdown.Converter()
converter.setFlavor('github') // 设置成github风格的转换器
const fs = require('fs')
const path = require('path')
const rm = require('rimraf')
```

2.初始化文件目录
```js
const mdFolder = 'markdown' // md目录
const htmlFolder = 'html' // html目录

rm.sync(path.resolve(htmlFolder)) // 删除html文件夹
if (!fs.existsSync(htmlFolder)) {
  fs.mkdirSync(htmlFolder) // 新建html文件夹
}
```

3.生成 html 文件
```js
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
```