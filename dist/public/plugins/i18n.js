export default function ({ app }) {
  app.i18n.onLanguageSwitched = (o, n) => {
    app.store.dispatch('setLang', n)
  }
}
