export function formatInput(entity, { data, locale, otherData = {} }) {
  return mapped[entity].input(data, locale, otherData)
}

export function formatOutput(entity, { data, locale, otherData = {} }) {
  return mapped[entity].output(data, locale, otherData)
}

const rawTravelToFormattedTravel = (travel, locale, otherData) => {
  const otherLocale = locale === 'fr' ? 'it' : 'fr'
  return {
    id: travel.travel_id,
    published: !!travel[`travel_published_${locale}`],
    published_date: travel[`travel_published_date_${locale}`] || '',
    same_start_end: !!travel.travel_same_start_end,
    title: travel[`travel_title_${locale}`] || `<span class="italic">${travel[`travel_title_${otherLocale}`]}</span>`,
    slug: travel[`travel_slug_${locale}`] || '',
    category: travel.travel_category
      ? otherData.categories.find((cat) => cat.category_id === travel.travel_category)
      : {},
    cover_desktop: travel[`travel_cover_${locale}`]
      ? otherData.assets.find((asset) => asset.asset_id === travel[`travel_cover_${locale}`])
      : null,
    cover_mobile: travel[`travel_cover_mobile_${locale}`]
      ? otherData.assets.find((asset) => asset.asset_id === travel[`travel_cover_mobile_${locale}`])
      : null,
    countries: travel[`travel_countries_${locale}`],
    dates: [travel.travel_start_date, travel.travel_end_date],
    hashtags: travel.travel_hashtags || [],
    playlist: travel[`travel_playlist_${locale}`] || '',
    short_desc: travel[`travel_desc_${locale}`] || '',
    long_desc: travel[`travel_long_desc_${locale}`] || []
    // TODO: changer la logique à DB pour le faire devenir comme les articles
  }
}
const formattedTravelToRawTravel = (travel, locale, otherData) => {
  const rawTravel = travel.id ? otherData.travels.find((t) => travel.id === t.travel_id) : null
  if (rawTravel) {
    Object.keys(rawTravel).forEach((key) => {
      if (typeof rawTravel[key] === 'object') {
        rawTravel[key] = JSON.stringify(rawTravel[key])
      }
    })
  }
  let formatted = rawTravel || {}

  formatted = {
    ...formatted,
    [`travel_title_${locale}`]: travel.title,
    travel_category: travel.category.category_id,
    [`travel_cover_${locale}`]: travel.cover_desktop ? travel.cover_desktop.asset_id : null,
    [`travel_cover_mobile_${locale}`]: travel.cover_mobile ? travel.cover_mobile.asset_id : null,
    [`travel_countries_${locale}`]: JSON.stringify(travel.countries),
    [`travel_slug_${locale}`]: travel.slug,
    [`travel_desc_${locale}`]: travel.short_desc,
    [`travel_playlist_${locale}`]: travel.playlist,
    [`travel_long_desc_${locale}`]: JSON.stringify(travel.long_desc),
    travel_start_date: travel.dates[0],
    travel_end_date: travel.dates[1],
    travel_hashtags: JSON.stringify(travel.hashtags)
  }
  // console.log('FORMATTER', travel, rawTravel, formatted)

  return formatted
}

const rawArticleToFormattedArticle = (article, locale, otherData) => {
  const otherLocale = locale === 'fr' ? 'it' : 'fr'
  return {
    id: article.article_id,
    published: !!article[`article_published_${locale}`],
    published_date: article[`article_published_date_${locale}`] || '',
    title:
      article[`article_title_${locale}`] || `<span class="italic">${article[`article_title_${otherLocale}`]}</span>`,
    slug: article[`article_slug_${locale}`] || '',
    cover_desktop: article[`article_cover_${locale}`]
      ? otherData.assets.find((asset) => asset.asset_id === article[`article_cover_${locale}`])
      : null,
    cover_mobile: article[`article_cover_mobile_${locale}`]
      ? otherData.assets.find((asset) => asset.asset_id === article[`article_cover_mobile_${locale}`])
      : null,
    place: article[`article_place_${locale}`] || '',
    country: {
      key: article[`article_country_${locale}`].toLowerCase().replace(' ', '_'),
      label: article[`article_country_${locale}`]
    },
    size: article[`article_size_${locale}`],
    travel: article.article_travel_id
      ? otherData.travels.find((travel) => travel.travel_id === article.article_travel_id)
      : null,
    dates: [article.article_start_date, article.article_end_date],
    gallery: article[`article_gallery_${locale}`] || [],
    short_desc: article[`article_short_desc_${locale}`] || '',
    long_desc: article[`article_long_desc_${locale}`] || []
  }
}

const formattedArticleToRawArticle = (article, locale, otherData) => {
  const rawArticle = article.id ? otherData.articles.find((t) => article.id === t.article_id) : null
  if (rawArticle) {
    Object.keys(rawArticle).forEach((key) => {
      if (typeof rawArticle[key] === 'object') {
        rawArticle[key] = JSON.stringify(rawArticle[key])
      }
    })
  }
  let formatted = rawArticle || {}

  formatted = {
    ...formatted,
    [`article_title_${locale}`]: article.title,
    [`article_cover_${locale}`]: article.cover_desktop ? article.cover_desktop.asset_id : null,
    [`article_cover_mobile_${locale}`]: article.cover_mobile ? article.cover_mobile.asset_id : null,
    [`article_country_${locale}`]: article.country.label,
    [`article_place_${locale}`]: article.place,
    [`article_slug_${locale}`]: article.slug,
    [`article_short_desc_${locale}`]: article.short_desc,
    [`article_long_desc_${locale}`]: JSON.stringify(article.long_desc),
    [`article_gallery_${locale}`]: JSON.stringify(article.gallery),
    [`article_size_${locale}`]: article.size.key,
    article_start_date: article.dates[0],
    article_end_date: article.dates[1],
    article_travel_id: article.travel.travel_id
  }
  // console.log('FORMATTER', article, rawArticle, formatted)

  return formatted
}

const mapped = {
  travel: {
    input: rawTravelToFormattedTravel,
    output: formattedTravelToRawTravel
  },
  article: {
    input: rawArticleToFormattedArticle,
    output: formattedArticleToRawArticle
  }
}
