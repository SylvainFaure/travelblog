import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['assets'])
  },
  methods: {
    formatTravel(travel) {
      const lang = this.$store.getters.lang
      if (lang === 'fr') {
        travel.name = travel.travel_title_fr
        travel.slug = travel.travel_slug
        travel.description = travel.travel_desc_fr
        travel.long_description = travel.travel_long_desc_fr
        travel.countries = travel.travel_countries_fr
      }
      if (lang === 'it') {
        travel.name = travel.travel_title_it
        travel.slug = travel.travel_slug
        travel.description = travel.travel_desc_it
        travel.long_description = travel.travel_long_desc_it
        travel.countries = travel.travel_countries_it
      }
      return travel
    }
  }
}
