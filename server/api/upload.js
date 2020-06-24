const router = require('express').Router()
const AWS = require('aws-sdk')
const fs = require('fs')
const fileType = require('file-type')
const bluebird = require('bluebird')
const multiparty = require('multiparty')
module.exports = router

AWS.config.update({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
})

AWS.config.setPromisesDependency(bluebird)

const s3 = new AWS.S3()

const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  }
  return s3.upload(params).promise()
}

router.post('/', (req, res, next) => {
  if (req.user.dataValues.isAdmin) {
    const form = new multiparty.Form()
    form.parse(req, async (err, fields, files) => {
      if (err) throw new Error(err)
      try {
        const path = files.file[0].path
        const buffer = fs.readFileSync(path)
        const type = await fileType.fromBuffer(buffer)
        const timestamp = Date.now().toString()
        const fileName = `bucketFolder/${timestamp}-lg`
        const data = await uploadFile(buffer, fileName, type)
        return res.status(200).send(data.Key)
      } catch (err) {
        next(err)
      }
    })
  } else {
    res.status(401).send('Not Found')
  }
})
