const fs = require('fs')
const readline = require('readline')
const stream = require('stream')
const gunzip = require('gunzip-file')

const filePath = "./data.txt"

console.log('app working!')

// unzipps the file
gunzip(filePath + '.gz', filePath, () => {
  console.log('gunzip done!')
})
