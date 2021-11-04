// @see https://qiita.com/suin/items/bce351c812603d413841
const { workerData } = require('worker_threads')
const optimizer = require('./optimizer')

console.log('exec files:', workerData)

workerData.forEach(fileName => {
  optimizer.optimize(fileName)
});