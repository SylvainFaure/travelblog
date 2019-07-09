<template>
  <figure
    v-lazyload
    itemprop="image"
    itemtype="http://schema.org/ImageObject"
    class="img-wrapper"
  >
    <div class="img__placeholder" />
    <transition name="fade">
      <img
        class="img"
        :data-url="_asset.src"
        :alt="_asset.title"
        :srcset="`${!external ? `${s3BaseUrl}thumb/${_asset.src} 500w, ${s3BaseUrl}img/${_asset.src} 1000w` : `${_asset.src}`}`"
        :sizes="`${!external ? `(max-width: 800px) 400px, (max-width: 1000px) 600px` : ''}`"
      >
    </transition>
    <figcaption
      v-if="showInfos"
      class="img-infos"
    >
      <p>{{ _asset.title }}</p>
      <p>{{ _asset.place }}</p>
    </figcaption>
  </figure>
</template>
<script>
import formatAsset from '@/mixins/formatAsset'

export default {
  mixins: [formatAsset],
  props: {
    asset: {
      type: Object,
      required: true
    },
    showInfos: {
      type: Boolean,
      required: false,
      default: false
    },
    gallery: {
      type: Boolean,
      required: false,
      default: false
    },
    external: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      s3BaseUrl: process.env.AWS_BUCKET_PATH
    }
  },
  computed: {
    _asset() {
      return this.formatAsset(this.asset)
    }
  }
}
</script>
<style lang="scss">
.img {
  opacity: 0;
  visibility: hidden;
  width: 100%;
  height: auto;
  min-height: 8em;
  transition: all 0.3s ease-out;
  &-wrapper {
    position: relative;
    transition: all 0.3s ease;
    &:hover {
      transform: scale(0.98);
      opacity: 0.7;
      cursor: pointer;
      & > .img-infos {
        visibility: visible;
      }
    }

    &.loaded {
      > img {
        opacity: 1;
        visibility: visible;
      }
      > .img__placeholder {
        display: none;
      }
    }
  }
  &__placeholder {
    width: 100%;
    min-height: 7em;
    background: url(/polaroid.png);
    background-size: 40%;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    top: 30%;
    transform: rotate(25deg);
  }
  &-infos {
    visibility: hidden;
    position: absolute;
    width: 100%;
    top: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
    font-size: 1.2em;
    font-weight: 500;
    //transition: all 0.3s ease;
  }
}
</style>
