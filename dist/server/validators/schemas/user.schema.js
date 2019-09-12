const Joi = require('joi');

const create = Joi.object({
  email: Joi.string().email().required(),
  role: Joi.string().required().valid('visitor', 'editor', 'admin')
});

const signup = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const signin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const token = Joi.object({
  token: Joi.string().required(),
});

const request = Joi.object({
  type: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().required().valid('admin', 'visitor', 'editor')
})

const userSchemas = { create, signup, signin, request, token };

module.exports = userSchemas; 
