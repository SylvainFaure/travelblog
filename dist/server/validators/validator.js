const joi = require('joi');
const userSchema = require('./schemas/user.schema') ;
const articleSchema = require('./schemas/article.schema') ;
const travelSchema = require('./schemas/travel.schema') ;
const assetSchema = require('./schemas/asset.schema') ;


validate = (value, schema, method) => {  
 let schemaObj
 switch(schema) {
   case 'user':
    schemaObj = userSchema
    break;
   case 'article': 
    schemaObj = articleSchema
    break;
   case 'travel':
    schemaObj = travelSchema
    break;
   case 'asset':
    schemaObj = assetSchema
    break;
 }
 const sch = {
  body: schemaObj[method]
 }
 return new Promise((res, rej) => {
   joi.validate(value, sch.body, (err, value) => {
     if (!err) {
      res(value);
     } else {
      // TODO: wrap response to more usable one
      rej(err);
     }
   })  
 })
}

module.exports = validate;
