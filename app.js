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

const unqiueNames = {}

const regex = /.+?(?=--)/

rl.on('line', (line) => {
  if (line[0] !== ' ') {
    let name = line.match(regex)[0].split(',')
    let firstName = name[1].trim()
    let lastName = name[0]
    unqiueNames[[firstName, lastName].join(" ")] = (unqiueNames[firstName, lastName] || 0) + 1
  }
})


rl.on('close', () => {
  console.log(Object.keys(unqiueNames).length)
})
