const Joi = require('joi');

const create = Joi.alternatives().try(
  Joi.object().keys({
    article_title_fr: Joi.string().allow(''),
    article_title_it: Joi.string(),
    article_travel_id: Joi.number(),
    article_country_fr: Joi.string().allow(''),
    article_country_it: Joi.string().allow(''),
    article_place_fr: Joi.string().allow(''),
    article_place_it: Joi.string().allow(''),
    article_slug: Joi.string().required(), // todo: generate it if not present
    article_catch_phrase_fr: Joi.string().allow(''),
    article_catch_phrase_it: Joi.string().allow(''),
    article_short_desc_fr: Joi.string().allow(''),
    article_short_desc_it: Joi.string().allow(''),
    article_long_desc_fr: Joi.string().allow(''),
    article_long_desc_it: Joi.string().allow(''),
    article_gallery_fr: Joi.string().allow(''),
    article_gallery_it: Joi.string().allow(''),
    article_cover: Joi.string().allow(''),
    article_date_from: Joi.number(),
    article_date_to: Joi.number(),
    article_published_date_fr: Joi.string().allow(''),
    article_published_date_it: Joi.string().allow(''),
    article_published_fr: Joi.bool(),
    article_published_it: Joi.bool()
  }),
  Joi.object().keys({
    article_title_fr: Joi.string(),
    article_title_it: Joi.string().allow(''),
    article_travel_id: Joi.number(),
    article_country_fr: Joi.string().allow(''),
    article_country_it: Joi.string().allow(''),
    article_place_fr: Joi.string().allow(''),
    article_place_it: Joi.string().allow(''),
    article_slug: Joi.string().required(), // todo: generate it if not present
    article_catch_phrase_fr: Joi.string().allow(''),
    article_catch_phrase_it: Joi.string().allow(''),
    article_short_desc_fr: Joi.string().allow(''),
    article_short_desc_it: Joi.string().allow(''),
    article_long_desc_fr: Joi.string().allow(''),
    article_long_desc_it: Joi.string().allow(''),
    article_gallery_fr: Joi.string().allow(''),
    article_gallery_it: Joi.string().allow(''),
    article_cover: Joi.string().allow(''),
    article_date_from: Joi.number(),
    article_date_to: Joi.number(),
    article_published_date_fr: Joi.string().allow(''),
    article_published_date_it: Joi.string().allow(''),
    article_published_fr: Joi.bool(),
    article_published_it: Joi.bool()
  })
);

const publish = Joi.alternatives().try(
  Joi.object().keys({
    article_id: Joi.number().required(),
    article_title_fr: Joi.string().allow(''),
    article_title_it: Joi.string().required(),
    article_travel_id: Joi.number().required(),
    article_country_fr: Joi.string().allow(''),
    article_country_it: Joi.string().required(),
    article_place_fr: Joi.string().allow(''),
    article_place_it: Joi.string().required(),
    article_slug: Joi.string().required(), // todo: generate it if not present
    article_catch_phrase_fr: Joi.string().allow(''),
    article_catch_phrase_it: Joi.string().allow(''),
    article_short_desc_fr: Joi.string().allow(''),
    article_short_desc_it: Joi.string().required(),
    article_long_desc_fr: Joi.string().allow(''),
    article_long_desc_it: Joi.string().required(),
    article_gallery_fr: Joi.string().allow(''),
    article_gallery_it: Joi.string().allow(''),
    article_cover: Joi.string().required(),
    article_date_from: Joi.number().required(),
    article_date_to: Joi.number().required(),
    article_published_date_fr: Joi.string().allow(''),
    article_published_date_it: Joi.string().required(),
    article_published_fr: Joi.bool(),
    article_published_it: Joi.bool().required()
  }),
  Joi.object().keys({
    article_title_fr: Joi.string().required(),
    article_title_it: Joi.string().allow(''),
    article_travel_id: Joi.number().required(),
    article_country_fr: Joi.string().required(),
    article_country_it: Joi.string().allow(''),
    article_place_fr: Joi.string().required(),
    article_place_it: Joi.string().allow(''),
    article_slug: Joi.string().required(), // todo: generate it if not present
    article_catch_phrase_fr: Joi.string().allow(''),
    article_catch_phrase_it: Joi.string().allow(''),
    article_short_desc_fr: Joi.string().required(),
    article_short_desc_it: Joi.string().allow(''),
    article_long_desc_fr: Joi.string().required(),
    article_long_desc_it: Joi.string().allow(''),
    article_gallery_fr: Joi.string().allow(''),
    article_gallery_it: Joi.string().allow(''),
    article_cover: Joi.string().required(),
    article_date_from: Joi.number().required(),
    article_date_to: Joi.number().required(),
    article_published_date_fr: Joi.string().required(),
    article_published_date_it: Joi.string().allow(''),
    article_published_fr: Joi.bool().required(),
    article_published_it: Joi.bool()
  })
);

const articleSchemas = { create, publish };

module.exports = articleSchemas; 
