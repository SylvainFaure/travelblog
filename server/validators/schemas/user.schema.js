const Joi = require('joi');
const userSchemas = {
  signup: {
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
  },
  signin: {
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
  },
  request: {
    body: {
      email: Joi.string().email().required(),
      role: Joi.string().required().valid('admin', 'visitor', 'editor')
    }
  }
}
module.exports = userSchemas; 
