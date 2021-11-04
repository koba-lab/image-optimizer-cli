// @see https://blog.kozakana.net/2019/04/sharp-resize/
const sharp = require('sharp');

const MAX_IMAGE_WIDTH = 900

module.exports = {
  optimize: async (fileName) => {
    const fileBase = fileName.split('.')[0]
    const sourceImagePath = `/var/tmp/source/${fileName}`
    const distImagePath = `/var/tmp/dist/${fileBase}.jpg`
    const dist = sharp(sourceImagePath).clone()

    // 共通処理
    // 最大幅より大きければ縮小する
    const metadata = await dist.metadata()
    // console.log('MAX WIDTH CHECK: metadata:', metadata)
    if (metadata.width > MAX_IMAGE_WIDTH) {
      dist.resize(MAX_IMAGE_WIDTH, MAX_IMAGE_WIDTH, {
        fit: 'inside'
      })
    }

    // 出力前加工
    // console.log('OUTPUT FORMAT CHECK: metadata:', metadata)
    const jpegOptions = {
      quality: 72,
      progressive: true,
      force: true,
    }
    if (metadata.format != 'jpeg') {
      // すべてjpgに統一したい
      dist.toFormat('jpeg', jpegOptions).toFile(distImagePath);
    } else {
      dist.jpeg(jpegOptions).toFile(distImagePath);
    }
    console.log('success:', distImagePath)
  },
}
