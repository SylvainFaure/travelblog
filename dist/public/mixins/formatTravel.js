import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['assets'])
  },
  methods: {
    formatTravel(travel) {
      console.log(this.$i18n.locale)
      const lang = this.$i18n.locale
      if (lang === 'fr') {
        travel.name = travel.travel_title_fr
        travel.slug = travel.travel_slug
        travel.description = travel.travel_desc_fr
        travel.long_description = travel.travel_long_desc_fr
        travel.countries = JSON.parse(travel.travel_countries_fr).join(', ')
      }
      if (lang === 'it') {
        travel.name = travel.travel_title_it
        travel.slug = travel.travel_slug
        travel.description = travel.travel_desc_it
        travel.long_description = travel.travel_long_desc_it
        travel.countries = JSON.parse(travel.travel_countries_it).join(', ')
      }
      return travel
    }
  }
}
