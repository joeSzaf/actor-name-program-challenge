const checkName = (name, nameCount, topNamesList, uniqueNamesList) => {
  if (topNamesList.length === 0) {
    topNamesList.push({ name: name, count: uniqueNamesList[name] })
  } else if (topNamesList.length < 10) {
    for (let i = 0; i < topNamesList.length; i ++) {
      if (nameCount > topNamesList[i]) {
        topNamesList.splice(i, 0, { name: name, count: nameCount })
        return topNamesList.pop()
      }
    }
    topNamesList.push({ name: name, count: nameCount })
  } else if (nameCount > topNamesList[9].count) {
    let indexOfExistingName = topNamesList.findIndex(item => item.name === name)

    for (let i = 0; i < 10; i ++) {
      if (nameCount > topNamesList[i].count) {
        topNamesList.splice(i, 0, { name: name, count: nameCount })
        if (indexOfExistingName === -1) {
          return topNamesList.pop()
        } else {
          return topNamesList.splice(indexOfExistingName + 1, 1);
        }
      }
    }
  }
}

module.exports = checkName
