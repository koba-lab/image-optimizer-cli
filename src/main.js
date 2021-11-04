const _ = require('lodash')
const fs = require('fs');
const path = require('path');
const { Worker } = require('worker_threads')
let workers = []

console.log("exec image convert")

const IMG_EXTS = ['.jpg', '.png', '.jpeg', '.gif']; // 画像拡張子

fs.readdir('/var/tmp/source', function(err, files) {
  if (err) throw err;
  _.chunk(files.filter(name => {
    // 画像以外はフィルタリング
    const ext = path.extname(name).toLowerCase()
    return IMG_EXTS.indexOf(ext) >= 0
  }), 50)
  .forEach(fileNames => {
    workers.push(new Worker('./lib/worker.js', {
      workerData: fileNames,
    }))
  })
});


