import expressJoi from 'express-joi-validator';
import userSchema from './schemas/user.schema';

validate = (method) => {    
     return expressJoi(userSchema[method])
}

module.exports = validate;
