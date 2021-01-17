<template>
  <div>
    <h4 v-if="label" class="label font-bold my-4">
      <span class="bg-white z-10 pr-6">{{ label }}</span>
    </h4>
    <div>
      <div v-if="galleryModel && galleryModel.length" class="flex">
        <div v-for="img in galleryModel" :key="img.asset_id" class="mr-4 relative w-1/4">
          <span class="absolute top-0 right-0 m-2 text-white" @click="removeAsset(img)">
            <Icon name="cross" />
          </span>
          <img :src="img.asset_src" class="mx-2" />
        </div>
      </div>
      <div v-if="isEditable" class="flex justify-end w-full">
        <Btn icon-btn :icon="galleryModel && galleryModel.length ? 'pencil' : 'plus'" @click="openModal" />
      </div>
      <AssetsModal
        v-if="modalId === `pick-gallery-${realId}`"
        :assets="assets"
        pick="multiple"
        :picked="[...galleryModel]"
        :pick-limit="4"
        :data="data"
        @confirm="confirmGallery"
      />
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import { mapState, mapMutations } from 'vuex'
export default {
  props: {
    id: VueTypes.string.def(null),
    label: VueTypes.string.def('Choose an image'),
    gallery: VueTypes.array.def([]),
    assets: VueTypes.array.def([]),
    data: VueTypes.object.def({})
  },
  data() {
    const i = Math.floor(Math.random() * 10000)
    return {
      galleryModel: [],
      realId: i
    }
  },
  computed: {
    ...mapState('modal', ['visible', 'modalId']),
    isEditable() {
      return this.galleryModel && this.galleryModel.length < 4
    }
  },
  mounted() {
    if (this.gallery && this.gallery.length) {
      this.galleryModel = this.gallery
    }
    if (this.id) {
      this.realId = this.id
    }
  },
  methods: {
    ...mapMutations('modal', ['setVisible', 'setModalId']),
    openModal() {
      this.setVisible(true)
      this.setModalId(`pick-gallery-${this.realId}`)
    },
    confirmGallery(gallery) {
      this.galleryModel = gallery
    },
    removeAsset(asset) {
      this.galleryModel = this.galleryModel.filter((a) => a.asset_id !== asset.asset_id)
    },
    getContent() {
      return this.galleryModel
    }
  }
}
</script>
