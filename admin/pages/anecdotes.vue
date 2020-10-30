<template>
  <section class="anecdotes-page flex justify-between">
    <div class="sidebar"></div>
    <div class="anecdotes-page__container m-4 w-2/3">
      <table class="table-fixed w-full">
        <thead class="border-t-2 border-blue-500">
          <tr>
            <th
              v-for="col in columns"
              :key="col"
              :class="{
                'px-4 py-2': true,
                'w-1/4': col !== 'desc',
                'w-1/2': col === 'desc'
              }"
            >
              {{ $t(`anecdotes.${col}`) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(anecdote, i) in anecdotes" :key="anecdote.anecdote_id" :class="{ 'bg-gray-200': i % 2 === 0 }">
            <td v-for="(col, index) in columns" :key="`${col}-${index}`" class="border-b-2 border px-4 py-2">
              <div v-if="col !== 'actions'" v-html="getColumnValue(col, anecdote)"></div>
              <div v-else class="flex justify-center">
                <Icon class="mx-4" name="pencil" @click="openModifyModal(anecdote)" />
                <Icon class="mx-4" name="bin" @click="openRemoveModal(anecdote)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-end w-full my-4">
        <Btn icon-btn icon="plus" @click="openModifyModal" />
      </div>
    </div>
    <RemoveModal v-if="modalId === 'remove-anecdote'" @confirm="removeAnecdote" @cancel="closeModal" />
    <EditAnecdoteModal
      v-if="modalId === 'edit-anecdote'"
      :anecdote="anecdoteToEdit"
      :assets="assets"
      @confirm="saveAnecdote"
      @cancel="closeModal"
    />
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  async asyncData({ app, $axios }) {
    const locale = app.i18n.locale
    let anecdotes = []
    let articles = []
    let assets = []
    try {
      const [anecdotesData, articlesData, assetsData] = await Promise.all([
        $axios.get('/api/anecdotes'),
        $axios.get('/api/articles'),
        $axios.get('/api/assets')
      ])
      anecdotes = anecdotesData.data
      articles = articlesData.data
      assets = assetsData.data
    } catch (error) {
      console.warn(error)
    }
    return {
      locale,
      anecdotes,
      articles,
      assets
    }
  },
  data() {
    return {
      columns: ['title', 'actions'],
      anecdoteToDelete: null,
      anecdoteToEdit: null
    }
  },
  computed: {
    ...mapState('modal', ['modalId'])
  },
  methods: {
    ...mapMutations('modal', ['setVisible', 'setModalId']),
    async reloadData() {
      try {
        const { data } = await this.$axios.get('/api/anecdotes')
        this.anecdotes = data || []
      } catch (error) {
        console.warn(error)
      }
    },
    getColumnValue(col, anecdote) {
      return anecdote[`anecdote_${col}`]
    },
    openRemoveModal(anecdote) {
      this.anecdoteToDelete = anecdote
      this.setModalId('remove-anecdote')
      this.setVisible(true)
    },
    closeModal() {
      this.setModalId(null)
      this.setVisible(false)
    },
    async removeAnecdote() {
      try {
        await this.$axios.delete(`/api/anecdotes/${this.anecdoteToDelete.anecdote_id}`)
        this.$toast.success(this.$t('anecdotes.remove.success'))
        this.closeModal()
        this.anecdoteToDelete = null
        this.reloadData()
      } catch (error) {
        console.warn(error)
        this.$toast.error(this.$t('anecdotes.remove.error'))
      }
    },
    async saveAnecdote(anecdote) {
      if (!anecdote.anecdote_id) {
        try {
          await this.$axios.post('/api/anecdotes', anecdote)
          this.$toast.success(this.$t('anecdotes.save.success'))
          this.reloadData()
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
    openModifyModal(anecdote) {
      this.anecdoteToEdit = anecdote || {}
      this.setVisible(true)
      this.setModalId('edit-anecdote')
    }
  }
}
</script>
