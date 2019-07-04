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
import formatRoute from '@/mixins/formatRoute'
import Gallery from '@/components/Gallery'
export default {
  components: {
    Gallery
  },
  mixins: [ formatRoute ],
  data() {
    return {
      travelId: this.getTravelIdFromSlug(this.$route.params.travelSlug)
    }
  },
  computed: {
    ...mapState(['assets']),
    travelAssets() {
      return this.assets.filter(asset => {
        return Number(asset.asset_travel_id) === Number(this.travelId)
      })
    }
  }
}
</script>
<style lang="scss">

</style>
