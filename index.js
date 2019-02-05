/**
 * Express Setting and Routes
 * @type {createApplication|createApplication}
 */
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

/**
 * The .env configuration
 */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

/**
 * Setting up S3 access
 * @type {S3}
 */
const S3_CLIENT = new aws.S3({
  accessKeyId: process.env.KEY_ID,
  secretAccessKey: process.env.SECRET_KEY,
  region: 'us-east-1'
})

/**
 * Using Multer with S3 to allow multipart uploads
 * @callback upload
 * @param{S3, ImageFile}
 */
const MULTER_UPLOADER = multer({
  storage: multerS3({
    s3: S3_CLIENT,
    bucket: process.env.BUCKET_NAME,
    acl: 'public-read',
    metadata (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key (req, file, cb) {
      cb(null, Date.now().toString() + '.jpg')
    }
  })
})

/**
 * Setting up AWS Rekognition access
 * @type {Rekognition}
 */
const rekognition = new aws.Rekognition({
  accessKeyId: process.env.KEY_ID,
  secretAccessKey: process.env.SECRET_KEY,
  region: 'us-east-1'
})
/**
 * The params for Aws Rekognition
 * @param req
 * @returns {{MinConfidence: number, MaxLabels: number, Image: {S3Object: {Bucket: *, Name: *}}}}
 */
const params = (req) => {
  return {
    Image: {
      S3Object: {
        Bucket: process.env.BUCKET_NAME,
        Name: req.body.key
      }
    },
    MaxLabels: 20,
    MinConfidence: 90,
  }
}

/*------------------------------------------------*/

/**
 * Route using Multer
 * @type express route
 */
app.post('/upload', MULTER_UPLOADER.single('photo'), (req, res, next) => {
  res.json(req.file)
})

/**
 * Body Parser for Route not using Multer
 * @type {Parsers|*}
 */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/**
 * Route for AWS Rekognition
 * #type express route
 */
app.post('/rekognition', async (req, res, next) => {
  try {
    const data = await rekognition.detectLabels(params(req)).promise()
    const names = data.Labels.map(obj => obj.Name)
    res.send(names)
  } catch (e) {
    console.log(e, e.stack)
  }
})

app.listen(port, (err) => {
  if (err) { console.log(err) }
  console.log('Listening on port ' + port)
})
