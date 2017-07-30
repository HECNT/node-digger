var Digger = require('../models/digger')

module.exports.doSome = function (d) {
  return new Promise(function(resolve, reject) {
    Digger.doSome(d)
    .then(function(result){
      resolve(result)
    })
  })
}

module.exports.doTruncate = function (d) {
  return new Promise(function(resolve, reject) {
    Digger.doTruncate()
    .then(function(result) {
      resolve({err : false})
    })
  })
}

module.exports.getInfo = function (d) {
  return new Promise(function(resolve, reject) {
    Digger.getInfo(d)
    .then(function(result){
      resolve(result)
    })
  })
}
