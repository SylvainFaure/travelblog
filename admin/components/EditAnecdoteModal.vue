<template>
  <portal to="modal">
    <div>
      <div class="m-8">
        <InputText v-model="title" :label="$t('anecdotes.title')" />
        <BlockEditor
          v-if="mounted"
          ref="anecdoteContent"
          :label="$t('anecdotes.content')"
          :blocks="content"
          :assets="assets"
        />
      </div>
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
/* eslint-disable camelcase */
import VueTypes from 'vue-types'
import { mapMutations } from 'vuex'
export default {
  props: {
    anecdote: VueTypes.object.def({}),
    assets: VueTypes.array.def([])
  },
  data() {
    return {
      title: '',
      content: [],
      locale: '',
      mounted: false
    }
  },
  mounted() {
    this.locale = this.$i18n.locale
    this.title = this.anecdote && this.anecdote.anecdote_title ? this.anecdote.anecdote_title : ''
    this.content = this.anecdote && this.anecdote.anecdote_content ? this.anecdote.anecdote_content : []
    this.mounted = true
  },
  methods: {
    ...mapMutations('modal', ['setVisible', 'setModalId']),
    handleConfirm() {
      const blocks = this.$refs.anecdoteContent.getBlocks()
      this.$emit('confirm', {
        anecdote_id: this.anecdote.anecdote_id,
        anecdote_title: this.title,
        anecdote_content: JSON.stringify(blocks)
      })
      this.closeModal()
    },
    handleCancel() {
      this.closeModal()
    },
    closeModal() {
      this.setModalId(null)
      this.setVisible(false)
    }
  }
}
</script>
