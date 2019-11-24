const multer  = require('multer');
var storage;

const aws = require('./aws');
const multerS3 = require('multer-s3');

const s3 = new aws.S3();
storage = multerS3({
  s3: s3,
  bucket: process.env.S3_BUCKET_NAME,
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req, file, cb) => {
    const timestamp = new Date().getTime();
    const name = file.originalname.toLowerCase()
    cb(null, `img/${timestamp}_${name}`);
  }
})

const upload =  multer({ storage: storage });

module.exports = upload;