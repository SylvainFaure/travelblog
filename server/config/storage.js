const multer  = require('multer');
var storage;
if (process.env.NODE_ENV == "development") {
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/assets/img')
    },
    filename: (req, file, cb) => {
      var timestamp = new Date().getTime()
      cb(null, timestamp + '_' + file.originalname)
    }
  })
}
if (process.env.NODE_ENV !== "development") {
  const aws = require('aws-sdk');
  const multerS3 = require('multer-s3');
  
  aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'eu-west-3'
  }); 

  const s3 = new aws.S3();
  storage = multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: (req, file, cb) => {
      var timestamp = new Date().getTime();
      cb(null, timestamp + '_' + file.originalname);
    }
  })
}
const upload =  multer({ storage: storage });

module.exports = upload;