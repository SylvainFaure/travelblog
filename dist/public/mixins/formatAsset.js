export default {
  methods: {
    formatAsset(asset) {
      const lang = this.$store.getters.lang
      if (lang === 'fr') {
        asset.src = asset.asset_src
        asset.title = asset.asset_title_fr
        asset.place = asset.asset_place_fr
      }
      if (lang === 'it') {
        asset.src = asset.asset_src
        asset.title = asset.asset_title_it
        asset.place = asset.asset_place_it
      }
      return asset
    }
  }
}
