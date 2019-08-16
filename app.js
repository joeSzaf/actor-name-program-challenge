const fs = require('fs')
const readline = require('readline')
const stream = require('stream')
const gunzip = require('gunzip-file')

const filePath = "./data.txt"

// unzipps the file
// gunzip(filePath + '.gz', filePath, () => {
//   console.log('gunzip done!')
// })

const instream = fs.createReadStream('data.txt')
const outstream = new stream()
const rl = readline.createInterface(instream, outstream)

let lineCount = 0


rl.on('line', (line) => {
  lineCount += 1
})


rl.on('close', () => {
  console.log(lineCount)
})
