<template>
  <div
    v-if="visible && !!modalId"
    ref="overlay"
    class="h-screen w-screen fixed inset-0 bg-gray-700 bg-opacity-50 flex z-40 justify-center items-center"
    @click="handleOutsideClick"
  >
    <section class="modal-content bg-white rounded-lg max-w-2/3 max-h-3/4 overflow-y-auto z-50">
      <portal-target name="modal" slim></portal-target>
    </section>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('modal', ['visible', 'modalId'])
  },
  methods: {
    ...mapMutations('modal', ['setVisible', 'setModalId']),
    handleOutsideClick(ev) {
      if (ev.target === this.$refs.overlay) {
        this.setVisible(false)
        this.setModalId(null)
      }
    }
  }
}
</script>
<style lang="scss">
.modal-content {
  min-width: 33vw;
}
</style>
