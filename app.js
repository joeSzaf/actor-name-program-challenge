const fs = require('fs')
const readline = require('readline')
const stream = require('stream')
const gunzip = require('gunzip-file')

const checkName = require("./checkName")

const filePath = "./data.txt"

// unzipps the file
// gunzip(filePath + '.gz', filePath, () => {
//   console.log('gunzip done!')
// })


const instream = fs.createReadStream('data.txt')
const outstream = new stream()
const rl = readline.createInterface(instream, outstream)

const unqiueNames = {}
const firstNames = {}
const lastNames = {}

const topFirstNames = []

const regex = /.+?(?=--)/

// ############
function nameExists(name, array) {
  return array.some(function(item) {
    return item.name === name;
  })
}

// ############

rl.on('line', (line) => {
  if (line[0] !== ' ') {
    let name = line.match(regex)[0].split(',')
    let firstName = name[1].trim()
    let lastName = name[0]
    unqiueNames[[firstName, lastName].join(" ")] = (unqiueNames[firstName, lastName] || 0) + 1
    firstNames[firstName] = (firstNames[firstName] || 0) + 1
    lastNames[lastName] = (lastNames[lastName] || 0) + 1

    const firstNameCount = firstNames[firstName]

    checkName(firstName, firstNameCount, topFirstNames, firstNames)

    // if (topFirstNames.length === 0) {
    //   topFirstNames.push({ name: firstName, count: firstNames[firstName] })
    // } else if (topFirstNames.length < 10) {
    //   for (let i = 0; i < topFirstNames.length; i ++) {
    //     if (firstNameCount > topFirstNames[i]) {
    //       topFirstNames.splice(i, 0, { name: firstName, count: firstNameCount })
    //       return topFirstNames.pop()
    //     }
    //   }
    //   topFirstNames.push({ name: firstName, count: firstNameCount })
    // } else if (firstNameCount > topFirstNames[9].count) {
    //   let indexOfExistingName = topFirstNames.findIndex(item => item.name === firstName)
    //
    //   for (let i = 0; i < 10; i ++) {
    //     if (firstNameCount > topFirstNames[i].count) {
    //       topFirstNames.splice(i, 0, { name: firstName, count: firstNameCount })
    //       if (indexOfExistingName === -1) {
    //         return topFirstNames.pop()
    //       } else {
    //         return topFirstNames.splice(indexOfExistingName + 1, 1);
    //       }
    //     }
    //   }
    // }

  }
})


rl.on('close', () => {
  console.log("Unique names:", Object.keys(unqiueNames).length)
  console.log("Unique first names:", Object.keys(firstNames).length)
  console.log("Unique last names:", Object.keys(lastNames).length)
  console.log(topFirstNames)
})
