<template>
  <div class="block block-paragraph" v-html="content" />
</template>
<script>
export default {
  props: {
    content: {
      type: String,
      default: ''
    }
  }
}
</script>
