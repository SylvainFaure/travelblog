<template>
  <div class="homepage">
    <div class="w-full h-full flex justify-center items-center">
      <div class="flex flex-col items-center w-1/2">
        <h2 class="text-lg font-bold mb-2">{{ $t('general.welcome.title') }}</h2>
        <div class="mb-4" v-html="$t('general.welcome.text')"></div>
        <Btn :label="$t('general.publish')" icon="rocket" @click="handleNetlifyPublish" />
      </div>
    </div>
    <transition name="fade">
      <Loader v-if="loading" />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { normalizeEntity } from '../utils/functions'
export default {
  computed: {
    ...mapState(['loading'])
  },
  methods: {
    async handleNetlifyPublish() {
      try {
        await this.$axios.post(process.env.NETLIFY_DEPLOY_ENDPOINT)
        this.$toast.success(this.$t('site.publish.success'))
      } catch (error) {
        console.warn(error)
        this.$toast.error(this.$t('site.publish.error'))
      }
    }
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
