import Joi from 'joi';
import userSchema from './schemas/user.schema';

validate = (value, method) => {  
 const schema = {
  body: userSchema[method]
 }
 return new Promise((res, rej) => {
   Joi.validate(value, schema, (err, value) => {
     if (!err) {
      resolve(value);
     } else {
      reject(err);
     }
   })  
 })
}

module.exports = validate;
