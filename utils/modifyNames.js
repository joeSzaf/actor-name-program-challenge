const modifyNames = (names) => {
  modifiedNames = []

  for (let i=0; i < names.length; i++) {
    modifiedNames.push({
      first: names[i].first,
      last: names[(i+1) % names.length].last
    })
  }

  return modifiedNames
}

module.exports = modifyNames
