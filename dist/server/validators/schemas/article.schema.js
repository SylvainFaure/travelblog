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
    article_published_date_fr: Joi.any(),
    article_published_date_it: Joi.any(),
    article_published_fr: Joi.any(),
    article_published_it: Joi.any()
  }),
  Joi.object().keys({
    article_title_fr: Joi.string().allow(''),
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
    article_published_date_fr: Joi.any(),
    article_published_date_it: Joi.any(),
    article_published_fr: Joi.any(),
    article_published_it: Joi.any()
  })
);

const publish = Joi.alternatives().try(
  Joi.object().keys({
    article_id: Joi.number().required(),
    article_title_fr: Joi.string().allow(''),
    article_title_it: Joi.string().allow(''),
    article_travel_id: Joi.number().required(),
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
    article_published_fr: Joi.any(),
    article_published_it: Joi.any(),
    article_published_date_fr: Joi.any(),
    article_published_date_it: Joi.any(),
  }),
  Joi.object().keys({
    article_id: Joi.number().required(),
    article_title_fr: Joi.string().allow(''),
    article_title_it: Joi.string().allow(''),
    article_travel_id: Joi.number().required(),
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
    article_published_fr: Joi.any(),
    article_published_it: Joi.any(),
    article_published_date_fr: Joi.any(),
    article_published_date_it: Joi.any(),
  })
);

const articleSchemas = { create, publish };

module.exports = articleSchemas; 
