<template>
  <div>
    <h4 v-if="label" class="label font-bold my-4">
      <span class="bg-white z-10 pr-6">{{ label }}</span>
    </h4>
    <div>
      <div v-if="imageModel" class="justify-self-center">
        <img :src="imageModel.asset_src" class="h-56" />
      </div>
      <div class="flex justify-end w-full">
        <Btn icon-btn :icon="image ? 'pencil' : 'plus'" @click="openModal" />
      </div>
      <AssetsModal
        v-if="modalId === `pick-image-${id}`"
        :assets="assets"
        :picked="imageModel"
        @confirm="confirmImage"
      />
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import { mapState, mapMutations } from 'vuex'
export default {
  props: {
    id: VueTypes.string.def(''),
    label: VueTypes.string.def('Choose an image'),
    image: VueTypes.object.def(null),
    assets: VueTypes.array.def([])
  },
  data() {
    const i = Math.floor(Math.random() * 10000)
    return {
      imageModel: null,
      realId: i
    }
  },
  computed: {
    ...mapState('modal', ['visible', 'modalId'])
  },
  mounted() {
    if (this.image) {
      this.imageModel = this.image
    }
    if (this.id) {
      this.realId = this.id
    }
  },
  methods: {
    ...mapMutations('modal', ['setVisible', 'setModalId']),
    openModal() {
      this.setVisible(true)
      this.setModalId(`pick-image-${this.id}`)
    },
    confirmImage(image) {
      this.imageModel = image
      this.$emit('change', image)
    }
  }
}
</script>
