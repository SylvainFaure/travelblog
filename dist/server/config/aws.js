const aws = require('aws-sdk');

aws.config.update({
  secretAccessKey: process.env.AWS_SEC_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACC_KEY_ID,
  // region: 'eu-west-3'
});

module.exports = aws;