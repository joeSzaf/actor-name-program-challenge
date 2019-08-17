const fs = require('fs')
const readline = require('readline')
const stream = require('stream')
const gunzip = require('gunzip-file')

const checkName = require("./checkName")
const modifyNames = require("./modifyNames")

const filePath = "./data.txt"

// number of unqiue names
const N = 25

// unzipps the file
// gunzip(filePath + '.gz', filePath, () => {
//   console.log('gunzip done!')
// })


const instream = fs.createReadStream('data.txt')
const outstream = new stream()
const rl = readline.createInterface(instream, outstream)

const fullNames = {}
const firstNames = {}
const lastNames = {}

const topFirstNames = []
const topLastNames = []

const uniqueNames = []

const regex = /.+?(?=--)/

// ############
function nameExists(name, array) {
  return array.some(function(item) {
    return item.name === name;
  })
}

rl.on('line', (line) => {
  if (line[0] !== ' ') {
    // extracts first and last name from line of text
    let name = line.match(regex)[0].split(',')
    let firstName = name[1].trim()
    let lastName = name[0]

    // checks for uniqueness if num of unqiue names < 25
    if (uniqueNames.length < N) {
      if (!firstNames[firstName] && !lastNames[lastName]) {
        uniqueNames.push({ first: firstName, last: lastName })
      }
    }

    fullNames[[firstName, lastName].join(" ")] = (fullNames[firstName, lastName] || 0) + 1
    firstNames[firstName] = (firstNames[firstName] || 0) + 1
    lastNames[lastName] = (lastNames[lastName] || 0) + 1

    const firstNameCount = firstNames[firstName]
    const lastNameCount = lastNames[lastName]

    checkName(firstName, firstNameCount, topFirstNames, firstNames)
    checkName(lastName, lastNameCount, topLastNames, lastNames)
  }
})


rl.on('close', () => {
  console.log("Unique full names:", Object.keys(fullNames).length)
  console.log("Unique first names:", Object.keys(firstNames).length)
  console.log("Unique last names:", Object.keys(lastNames).length)
  console.log(topFirstNames)
  console.log(topLastNames)
  console.log(N, "unique names:")
  console.log(uniqueNames)
  console.log("modified names:")
  console.log(modifyNames(uniqueNames))
})
