if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

/*
 Requirements for Uploading Images
 */
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

//new aws s3 instance configs
const newS3 = new aws.S3({
  accessKeyId: process.env.KEY_ID,
  secretAccessKey: process.env.SECRET_KEY,
  region: 'us-east-1'
})

//Init multer with S3 configs
const upload = multer({
  storage: multerS3({
    s3: newS3,
    bucket: process.env.BUCKET_NAME,
    acl: 'public-read',
    key (req, file, cb) {
      cb(null, Date.now().toString() + '.jpg')
    }
  })
})

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send(`PORT ${port}`)
})

app.post('/upload', upload.single('photo'), (req, res, next) => {
  res.json(req.file)
})

app.listen(port, (err) => {
  if (err) { console.log(err) }
  console.log('Listening on port ' + port)
})
