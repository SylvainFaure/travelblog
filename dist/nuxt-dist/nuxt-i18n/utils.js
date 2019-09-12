/**
 * Asynchronously load messages from translation files
 * @param  {VueI18n}  i18n  vue-i18n instance
 * @param  {String}   lang  Language code to load
 * @return {Promise}
 */
export async function loadLanguageAsync (context, locale) {
  const LOCALE_CODE_KEY = 'code'
  const LOCALE_FILE_KEY = 'file'

  const { app } = context;

  if (!app.i18n.loadedLanguages) {
    app.i18n.loadedLanguages = []
  }
  if (!app.i18n.loadedLanguages.includes(locale)) {
    const langOptions = app.i18n.locales.find(l => l[LOCALE_CODE_KEY] === locale)
    if (langOptions) {
      const file = langOptions[LOCALE_FILE_KEY]
      if (file) {
      } else {
        console.warn('[nuxt-i18n] Could not find lang file for locale ' + locale)
      }
    }
  }
  return Promise.resolve()
}
