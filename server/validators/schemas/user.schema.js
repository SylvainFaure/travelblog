const Joi = require('joi');

const signup = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const signin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const request = Joi.object({
  email: Joi.string().email().required(),
  role: Joi.string().required().valid('admin', 'visitor', 'editor')
})

const userSchemas = { signup, signin, request };

module.exports = userSchemas; 
