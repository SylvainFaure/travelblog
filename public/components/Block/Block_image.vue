<template>
  <div class="block block-image">
    <ImageItem :asset="asset" />
  </div>
</template>
<script>
import ImageItem from '@/components/ImageItem'

export default {
  components: {
    ImageItem
  },
  props: {
    content: {
      type: Object,
      default: () => {}
    },
    asset: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
