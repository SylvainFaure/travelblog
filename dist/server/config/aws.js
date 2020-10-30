const aws = require('aws-sdk');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  // region: 'eu-west-3'
});

module.exports = aws;