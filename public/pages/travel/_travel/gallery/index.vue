<template>
  <section class="travel__gallery">
    <h1>Gallery</h1>
    <transition name="fade">
      <Gallery v-if="assets.length" :assets="travelAssets" />
    </transition>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import Gallery from '@/components/Gallery'
export default {
  components: {
    Gallery
  },
  data() {
    return {
      travelId: this.$route.params.travel
    }
  },
  computed: {
    ...mapState(['assets']),
    travelAssets() {
      // il faut ajouter un champ asset.asset_travel_id
      return this.assets.filter(asset => {
        return Number(asset.asset_travel_id) === Number(this.travelId)
      })
    }
  }
}
</script>
<style lang="scss">

</style>
