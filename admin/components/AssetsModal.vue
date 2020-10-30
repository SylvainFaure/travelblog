<template>
  <portal to="modal">
    <div class="relative h-full">
      <div v-if="pick === 'one' && pickedImage" class="m-8">
        <img :src="pickedImage.asset_src" class="h-48" />
      </div>
      <div v-else-if="pick === 'multiple' && !!pickedImages" class="m-8 flex flex-wrap">
        <div v-for="img in pickedImages" :key="img.asset_id" class="mr-4">
          <img :src="img.asset_src" class="h-32 m-2" />
        </div>
      </div>
      <AssetPickerLibrary
        :assets="assets"
        :picked="picked"
        :pick="pick"
        :pick-limit="pickLimit"
        @pick="handlePick"
        @picks="handlePicks"
      />
      <div class="sticky bottom-0 w-full translate-x-0 p-2 bg-white border-t-2 border-gray-500">
        <div class="flex justify-end">
          <Btn :label="$t('general.confirm')" @click="handleConfirm" />
          <Btn :label="$t('general.cancel')" type="secondary" @click="handleCancel" />
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
import VueTypes from 'vue-types'
import { mapMutations } from 'vuex'
export default {
  props: {
    assets: VueTypes.array.def([]),
    picked: VueTypes.oneOfType([VueTypes.object, VueTypes.array]).def(null),
    pick: VueTypes.string.def('one'),
    pickLimit: VueTypes.number.def(null)
  },
  data() {
    return {
      pickedImage: null,
      pickedImages: []
    }
  },
  mounted() {
    if (this.picked) {
      if (this.pick === 'one') {
        this.pickedImage = this.picked
      } else if (this.pick === 'multiple') {
        this.pickedImages = this.picked
      }
    }
  },
  methods: {
    ...mapMutations('modal', ['setVisible', 'setModalId']),
    handlePick(image) {
      this.pickedImage = image
    },
    handlePicks(assetsIds, asset, action) {
      if (action === 'add') {
        this.pickedImages.push(asset)
      } else {
        this.pickedImages = this.pickedImages.filter((a) => a.asset_id !== asset.asset_id)
      }
    },
    handleConfirm() {
      const payload = this.pick === 'one' ? this.pickedImage : this.pickedImages
      this.$emit('confirm', payload)
      this.setModalId(null)
      this.setVisible(false)
    },
    handleCancel() {
      this.setModalId(null)
      this.setVisible(false)
    }
  }
}
</script>
