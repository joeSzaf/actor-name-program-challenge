const fs = require('fs')
const readline = require('readline')
const stream = require('stream')
const gunzip = require('gunzip-file')

const checkName = require("./utils/checkName")
const modifyNames = require("./utils/modifyNames")
const nameExists = require("./utils/nameExists")

const filePath = "./data.txt"

// number of unqiue names
const N = 25

const decompressFile = new Promise((resolve, reject) => {
  gunzip(filePath + '.gz', filePath, () => {
    resolve()
  })
})

decompressFile.then((result) => {

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

  let logger = fs.createWriteStream('results.txt', {
    flags: 'a' // 'a' means appending (old data will be preserved)
  })

  rl.on('close', () => {
    fs.writeFile('results.txt', '', function(){console.log('file reset')})

    logger.write('Actor Name Program Results\n\n')

    console.log("o----------------------------o")
    console.log("| Actor Name Program Results |")
    console.log("o----------------------------o")
    console.log()

    // 1. The unique count of full names (i.e. duplicates are counted only once)
    console.log(`Unique full names: ${Object.keys(fullNames).length}`)
    logger.write(`Unique full names: ${Object.keys(fullNames).length}\n`)

    // 2. The unique count of last names
    console.log(`Unique last names: ${Object.keys(lastNames).length}`)
    logger.write(`Unique last names: ${Object.keys(lastNames).length}\n`)

    // 3. The unique count of first names
    console.log(`Unique first names: ${Object.keys(firstNames).length}`)
    logger.write(`Unique first names: ${Object.keys(firstNames).length}\n`)
    console.log()
    logger.write('\n')

    // 4. The ten most common last names (the names and number of occurrences)
    console.log("The ten most common last names (# of occurrences):")
    logger.write("The ten most common last names (# of occurrences):\n")
    topLastNames.forEach(name => {
      console.log(` * ${name.name} (${name.count})`)
      logger.write(` * ${name.name} (${name.count})\n`)
    })
    console.log()
    logger.write('\n')

    // 5. The ten most common first names (the names and number of occurrences)
    console.log("The ten most common first names (# of occurrences):")
    logger.write('The ten most common first names (# of occurrences):\n')
    topFirstNames.forEach(name => {
      console.log(` * ${name.name} (${name.count})`)
      logger.write(` * ${name.name} (${name.count})\n`)
    })
    console.log()
    logger.write('\n')

    // 6. A list of 25 completely unique names
    console.log(`First ${N} unique names:`)
    logger.write(`First ${N} unique names:\n`)
    uniqueNames.forEach(name => {
      console.log(` * ${name.first} ${name.last}`)
      logger.write(` * ${name.first} ${name.last}\n`)
    })
    console.log()
    logger.write('\n')

    // 7. A list of 25 modified names
    console.log(`First ${N} unique, modified names:`)
    logger.write(`First ${N} unique, modified names:\n`)
    const modifiedNames = modifyNames(uniqueNames)
    modifiedNames.forEach(name => {
      console.log(` * ${name.first} ${name.last}`)
      logger.write(` * ${name.first} ${name.last}\n`)
    })

  })
})
