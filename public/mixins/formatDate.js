import { formatRelative, parseISO } from 'date-fns'
import { fr, it } from 'date-fns/locale'

export default {
  methods: {
    formatRel(date) {
      if (date) {
        const lang = this.$store.getters.lang
        const locale = lang === 'fr' ? fr : it
        return formatRelative(parseISO(date), new Date(), { locale: locale })
      }
    }
  }
}
