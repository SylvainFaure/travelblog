<template>
  <div class="homepage flex justify-center items-center">
    Homepage
    <transition name="fade">
      <Loader v-if="loading" />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['loading'])
  }
}
</script>

<style lang="scss">
.homepage {
  height: calc(100vh - 72px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
