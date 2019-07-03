<template>
  <div class="block block-subtitle">
    <h2>{{ content }}</h2>
  </div>
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
