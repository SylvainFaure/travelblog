const Joi = require('joi');

const create = Joi.object({
  email: Joi.string().email().required(),
  role: Joi.string().required().valid('visitor', 'editor', 'admin')
});

const assetSchemas = { create };

module.exports = assetSchemas; 
