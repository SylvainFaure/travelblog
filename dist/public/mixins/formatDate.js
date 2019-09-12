import { formatRelative } from 'date-fns'
import { fr, it } from 'date-fns/locale'

export default {
  methods: {
    formatRel(date) {
      const d = new Date(date)
      if (d) {
        const lang = this.$store.getters.lang
        const locale = lang === 'fr' ? fr : it
        return formatRelative(d, new Date(), { locale: locale })
      }
    }
  }
}
