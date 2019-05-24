export default {
  methods: {
    getTravelIdFromSlug(slug) {
      const travels = this.$store.getters.travels
      const travel = travels.filter(travel => travel.travel_slug === slug)[0]
      return travel.travel_id
    }
  }
}
