<template>
  <section class="gallery travel__gallery">
    <div class="gallery__header">
      <h1 class="gallery__header-title">
        {{ $t('gallery_title') }}
      </h1>
      <span class="gallery__header-close" @click="closeGallery">&times;</span>
    </div>
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
  },
  methods: {
    closeGallery() {
      this.$router.push({ name: this.handleLocalize('travel-travelSlug'), params: { travelSlug: this.$route.params.travelSlug } })
    }
  }
}
</script>
<style lang="scss">

</style>
