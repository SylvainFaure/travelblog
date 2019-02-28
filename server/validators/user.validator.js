const joi = require('joi');
const userSchema = require('./schemas/user.schema') ;

validate = (value, method) => {  
 const schema = {
  body: userSchema[method]
 }
 return new Promise((res, rej) => {
   joi.validate(value, schema.body, (err, value) => {
     if (!err) {
      res(value);
     } else {
      rej(err);
     }
   })  
 })
}

module.exports = validate;
