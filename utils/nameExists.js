const nameExists = (name, array) => {
  return array.some(function(item) {
    return item.name === name;
  })
}

module.exports = nameExists
