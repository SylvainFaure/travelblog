const multer  = require('multer');
var storage;
/*if (process.env.NODE_ENV == "development") {
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
if (process.env.NODE_ENV !== "development") {*/
  const aws = require('./aws');
  const multerS3 = require('multer-s3');
  //const awss3 = require('aws-sdk/clients/s3');
  //const sss = new awss3();

  /*aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'eu-west-3'
  });*/

  /*sss.listObjectsV2(params = {Bucket: process.env.S3_BUCKET_NAME}, (err, data) => {
    console.log(err)
    //console.log(data)
    data.Contents.forEach(obj => {
      sss.getObjectAcl(params = {Bucket: process.env.S3_BUCKET_NAME, Key: obj.Key}, (err, data) => {
        console.log(err)
        console.log(`${obj.Key} has permission : %o`, data)
      })
    })
  })*/

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
//}
const upload =  multer({ storage: storage });

module.exports = upload;