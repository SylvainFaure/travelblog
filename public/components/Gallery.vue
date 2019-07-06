<template>
  <div class="gallery__container">
    <div
      v-for="asset in assets"
      :key="asset.id"
      class="gallery__img-wrapper"
    >
      <ImageItem
        :asset="asset"
        show-infos
        gallery
      />
    </div>
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

<style lang="scss">
.gallery__container {
  column-count: auto;
  column-width: 10em;
  column-gap: 5px;
}
.gallery__img-wrapper {
  border: 2px solid transparent;
  &:hover {
    //border: 2px solid black;
  }
}

</style>
