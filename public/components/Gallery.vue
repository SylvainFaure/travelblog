<template>
  <div class="gallery__container">
    <ImageItem
      v-for="asset in assets"
      :key="asset.id"
      :asset="asset"
      show-infos
      gallery
    />
  </div>
</template>

<script>
import ImageItem from '@/components/ImageItem'
export default {
  components: {
    ImageItem
  },
  props: {
    assets: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.gallery__container {
  column-count: auto;
  column-width: 10em;
  column-gap: 5px;
}

</style>
