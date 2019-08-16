const fs = require('fs')
const readline = require('readline')
const stream = require('stream')
const gunzip = require('gunzip-file')

const FILE_NAME = "data.txt"

console.log('app working!')

gunzip('data.txt.gz', 'data.txt', () => {
  console.log('gunzip done!')
})
