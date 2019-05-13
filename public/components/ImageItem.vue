<template>
  <figure
    v-lazyload
    itemprop="image"
    itemtype="http://schema.org/ImageObject"
    class="gallery__img-wrapper"
  >
    <img
      class="img"
      :data-url="asset.asset_src"
      :alt="asset.title"
      :srcset="`${!gallery ? `${s3BaseUrl}/img/${asset.asset_src} 500w, ${s3BaseUrl}/thumb/${asset.asset_src}1000w` : ''}`"
      :sizes="`${!gallery ? `(max-width: 800px) 400px, (max-width: 1000px) 600px` : ''}`"
    >
    <figcaption
      v-if="showInfos"
      class="img-infos"
    >
      <p>{{ asset.title }}</p>
      <p>{{ asset.place }}</p>
    </figcaption>
  </figure>
</template>
<script>
export default {
  props: {
    asset: {
      type: Object,
      required: true
    },
    showInfos: {
      type: Boolean,
      required: false
    },
    gallery: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      s3BaseUrl: process.env.AWS_BUCKET_PATH
    }
  }
}
</script>
<style lang="scss">
.img {
  width: 100%;
  height: auto;
  min-height: 8em;
  transition: all 0.6s;
  &-wrapper {
    position: relative;
    transition: all 0.3s ease;
    &:hover {
      transform: scale(0.98);
      opacity: 0.7;
      cursor: pointer;
      &.img-infos {
        color: white;
      }
    }
  }
  &-infos {
    position: absolute;
    width: 100%;
    top: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: lightgrey;
    font-size: 1.2em;
    font-weight: 500;
    transition: all 0.3s ease;
  }
}
</style>
