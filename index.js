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
    metadata(req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key (req, file, cb) {
      cb(null, Date.now().toString() + '.jpg')
    }
  })
})

//AWS Rekognition
const rekognition = new aws.Rekognition({
  accessKeyId: process.env.KEY_ID,
  secretAccessKey: process.env.SECRET_KEY,
  region: 'us-east-1'
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

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/rekognition', (req, res, next) => {
  const params = {
    Image: {
      S3Object: {
        Bucket: process.env.BUCKET_NAME,
        Name: req.body.key
      }
    },
    MaxLabels: 2,
    MinConfidence: 95,
  }
  rekognition.detectLabels(params,((err, data) => {
    if (err) {
      console.log(err, err.stack)
    }
    else {
      console.log(data)
    }
  }))
})

app.listen(port, (err) => {
  if (err) { console.log(err) }
  console.log('Listening on port ' + port)
})
