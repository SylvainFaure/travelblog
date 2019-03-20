<template>
  <div>
    ola {{ this.$route.params.travel }}
  </div>
</template>
<script>
export default {
  validate({ params }) {
    console.log(params)
    return true
  },
  data() {
    return {
      params: this.$router.params
    }
  }
}
</script>
<style lang="scss">
</style>
