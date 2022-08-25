const multer  = require('multer');
var storage;

const aws = require('./aws');
const multerS3 = require('multer-s3-transform');
const sharp = require('sharp');
sharp.cache( { files: 0 } );

const s3 = new aws.S3();
storage = multerS3({
  s3: s3,
  bucket: process.env.S3_BUCKET_NAME,
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  shouldTransform: function (req, file, cb) {
    cb(null, /^image/i.test(file.mimetype))
  },
  transforms: [
    {
      id: 'original',
      key: function (req, file, cb) {
        // console.log('original ', file)
        req.timestamp = new Date().getTime();
        const name = file.originalname.toLowerCase()
        cb(null, `img/${req.timestamp}_${name}`);
      },
      transform: function (req, file, cb) {
        cb(null, sharp().resize(1000).jpeg())
      }
    },
    {
      id: 'thumbnail',
      key: function (req, file, cb) {
        // console.log('thumbnail ', file, req.timestamp)
        const name = file.originalname.toLowerCase()
        cb(null, `thumb/mini_${req.timestamp}_${name}`);
      },
      transform: function (req, file, cb) {
        cb(null, sharp().resize(400).jpeg())
      }
    }
  ]
})

const upload =  multer({ storage: storage });

module.exports = upload;