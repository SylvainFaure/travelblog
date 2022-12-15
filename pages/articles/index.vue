<template>
  <section class="articles-page flex justify-center">
    <div class="articles-page__container m-4">
      <div class="flex">
        <div v-for="input in Object.keys(model)" :key="input" class="w-1/4 mr-2">
          <InputText v-model="model[input]" :label="$t(`article.${input}`)" @input="handleFilter" />
        </div>
      </div>
      <table class="table-fixed">
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
              {{ $t(`articles.${col}`) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(article, i) in filteredArticles"
            :key="article.article_id"
            :class="{ 'bg-gray-200': i % 2 === 0 }"
          >
            <td v-for="(col, index) in columns" :key="`${col}-${index}`" class="border-b-2 border px-4 py-2">
              <div v-if="col !== 'actions'" v-html="getColumnValue(col, article)"></div>
              <div v-else class="flex justify-between">
                <nuxt-link :to="`/articles/${article.article_id}`">
                  <Icon name="pencil" />
                </nuxt-link>
                <Icon name="bin" @click="openRemoveModal(article)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-end w-full my-4">
        <Btn icon-btn icon="plus" @click="openNewArticle" />
      </div>
    </div>
    <RemoveModal v-if="modalId === 'remove-article'" @confirm="removeArticle" @cancel="closeRemoveModal" />
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { format } from 'date-fns'
export default {
  async asyncData({ app, $axios }) {
    const locale = app.i18n.locale
    const otherLocale = locale === 'fr' ? 'it' : 'fr'
    let travels = []
    let articles = []
    try {
      const [travelsData, articlesData] = await Promise.all([$axios.get('/api/travels'), $axios.get('/api/articles')])
      travels = travelsData.data
      articles = articlesData.data
    } catch (error) {
      console.warn(error)
    }
    return {
      locale,
      otherLocale,
      travels,
      articles,
      filteredArticles: articles
    }
  },
  data() {
    return {
      columns: ['place', 'title', 'travel', 'country', 'published', 'actions'],
      articleToDelete: null,
      model: {
        place: '',
        title: '',
        travel: '',
        country: ''
      }
    }
  },
  computed: {
    ...mapState('modal', ['modalId'])
  },
  methods: {
    ...mapMutations('modal', ['setVisible', 'setModalId']),
    async reloadData() {
      try {
        const [travelsData, articlesData] = await Promise.all([
          this.$axios.get('/api/travels'),
          this.$axios.get('/api/articles')
        ])
        this.travels = travelsData ? travelsData.data : []
        this.articles = articlesData ? articlesData.data : []
      } catch (error) {
        console.warn(error)
      }
    },
    getTravel(article) {
      const travel = this.travels.find((t) => t.travel_id === article.article_travel_id)
      const title = travel[`travel_title_${this.locale}`]
      return `<a href="/travels/${travel.travel_id}">${title}</a>`
    },
    getColumnValue(col, article) {
      switch (col) {
        case 'travel':
          return this.getTravel(article)
        case 'published':
          // eslint-disable-next-line no-extra-boolean-cast
          return !!article[`article_${col}_${this.locale}`]
            ? format(new Date(article[`article_published_date_${this.locale}`]), 'dd/MM/yyyy')
            : ''
        default:
          return article[`article_${col}_${this.locale}`]
            ? article[`article_${col}_${this.locale}`]
            : `<span class="italic text-gray-500">${article[`article_${col}_${this.otherLocale}`]}</span>`
      }
    },
    openRemoveModal(article) {
      this.articleToDelete = article
      this.setModalId('remove-article')
      this.setVisible(true)
    },
    closeRemoveModal() {
      this.setModalId(null)
      this.setVisible(false)
    },
    async removeArticle() {
      try {
        await this.$axios.delete(`/api/articles/${this.articleToDelete.article_id}`)
        this.$toast.success(this.$t('article.remove.success'))
        this.closeRemoveModal()
        this.reloadData()
        this.articleToDelete = null
      } catch (error) {
        console.warn(error)
        this.$toast.error(this.$t('article.remove.error'))
      }
    },
    openNewArticle() {
      this.$router.push('/articles/new')
    },
    handleFilter() {
      const populatedFilters = {}
      Object.keys(this.model).filter((key) => {
        if (this.model[key]) {
          populatedFilters[key] = this.model[key]
        }
      })
      this.filteredArticles = this.articles.filter((article) => {
        const travel = this.travels.find((t) => t.travel_id === article.article_travel_id)[
          `travel_title_${this.locale}`
        ]
        const _article = { ...article, [`article_travel_${this.locale}`]: travel }
        return Object.keys(populatedFilters).every((key) => {
          return _article[`article_${key}_${this.locale}`].toLowerCase().includes(this.model[key].toLowerCase())
        })
      })
    }
  }
}
</script>
