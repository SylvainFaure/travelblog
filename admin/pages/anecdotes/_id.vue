<template>
  <EntityActions save-only can-remove :is-new="isNew" @save="saveAnecdote" @remove="openRemoveModal">
    <div class="m-8">
      <InputText v-model="title" :label="$t('anecdotes.title')" />
      <BlockEditor
        v-if="mounted"
        ref="anecdoteContent"
        :label="$t('anecdotes.content')"
        :blocks="content"
        :assets="assets"
        :data="{ travels, articles }"
      />
      <RemoveModal v-if="modalId === 'remove-anecdote'" @confirm="removeAnecdote" @cancel="closeModal" />
    </div>
  </EntityActions>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
/* eslint-disable camelcase */
export default {
  async asyncData({ $axios, route, app }) {
    let assets = []
    let travels = []
    let articles = []
    let anecdote
    try {
      if (route.params.id && route.params.id !== 'new') {
        const anecdoteData = await $axios.get(`/api/anecdotes/${route.params.id}`)
        anecdote = anecdoteData ? anecdoteData.data : null
      }
      const [assetsData, travelsData, articlesData] = await Promise.all([
        $axios.get('/api/assets'),
        $axios.get('/api/travels'),
        $axios.get('/api/articles')
      ])
      assets = assetsData.data
      travels = travelsData.data
      articles = articlesData.data
    } catch (error) {
      console.log(error)
    }
    return {
      assets,
      travels,
      anecdote,
      articles,
      title: anecdote ? anecdote.anecdote_title : '',
      content: anecdote ? anecdote.anecdote_content : [],
      locale: app.i18n.locale,
      isNew: !anecdote,
      mounted: false
    }
  },
  computed: {
    ...mapState('modal', ['modalId'])
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    ...mapMutations('modal', ['setVisible', 'setModalId']),
    async reloadData() {
      try {
        this.anecdote = await this.$axios.get(`/api/anecdotes/${this.$route.params.id}`)
      } catch (error) {
        console.warn(error)
      }
    },
    async saveAnecdote() {
      const blocks = this.$refs.anecdoteContent.getBlocks()
      const anecdote = {
        anecdote_id: this.anecdote ? this.anecdote.anecdote_id : null,
        anecdote_title: this.title,
        anecdote_content: JSON.stringify(blocks)
      }
      if (!anecdote.anecdote_id) {
        try {
          const { data } = await this.$axios.post('/api/anecdotes', anecdote)
          this.$toast.success(this.$t('anecdotes.save.success'))
          this.$router.push(`/anecdotes/${data[0].anecdote_id}`)
        } catch (error) {
          this.$toast.error(this.$t('anecdotes.save.error'))
        }
      } else {
        try {
          await this.$axios.put(`/api/anecdotes/${anecdote.anecdote_id}`, anecdote)
          this.$toast.success(this.$t('anecdotes.save.success'))
          this.reloadData()
        } catch (error) {
          this.$toast.error(this.$t('anecdotes.save.error'))
        }
      }
    },
    async removeAnecdote() {
      try {
        await this.$axios.delete(`/api/anecdotes/${this.anecdote.anecdote_id}`)
        this.$toast.success(this.$t('anecdotes.remove.success'))
        this.$router.push('/anecdotes')
      } catch (error) {
        console.warn(error)
        this.$toast.error(this.$t('anecdotes.remove.error'))
      } finally {
        this.closeModal()
      }
    },
    openRemoveModal() {
      this.setModalId('remove-anecdote')
      this.setVisible(true)
    },
    closeModal() {
      this.setModalId(null)
      this.setVisible(false)
    }
  }
}
</script>
