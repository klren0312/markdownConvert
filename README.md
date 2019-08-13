# Markdown Converter

## Feature

 - Convert markdown to PDF
 - Convert markdown to HTML

## dependenies

 - `markdown-pdf` convert markdown to pdf
 - `rimraf` like linux `rm -rf`
 - `showdown` convert markdown to html

## Install dependencies
```bash
npm install # or yarn
```

## Start Converter

### Convert to PDF
1.Set the PDF folder path and markdown folder
```javascript
const mdFolder = 'markdown'
const pdfFolder = 'pdf'
```

2.start
```bash
node mdToPdf.js
```

### Convert to HTML
1.Set the HTML folder path and markdown folder
```javascript
const mdFolder = 'markdown'
const htmlFolder = 'html'
```

2.start
```bash
node mdToHtml.js
```
