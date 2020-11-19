<template>
  <section class="travels-page flex flex-wrap justify-between">
    <div class="sidebar"></div>
    <div class="travels-page__container m-4">
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
              {{ $t(`travels.${col}`) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(travel, i) in travels" :key="travel.travel_id" :class="{ 'bg-gray-200': i % 2 === 0 }">
            <td v-for="(col, index) in columns" :key="`${col}-${index}`" class="border-b-2 border px-4 py-2">
              <div v-if="col !== 'actions'" v-html="getColumnValue(col, travel)"></div>
              <div v-else class="flex justify-between">
                <nuxt-link :to="`/travels/${travel.travel_id}`">
                  <Icon name="pencil" />
                </nuxt-link>
                <Icon name="bin" @click="openRemoveModal('travel', travel)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-end w-full my-4">
        <Btn icon-btn icon="plus" @click="openNewTravel" />
      </div>
    </div>
    <RemoveModal v-if="modalId === 'remove-travel'" @confirm="removeEntity" @cancel="closeRemoveModal" />

    <div class="categories-page__container m-4">
      <table class="table-fixed">
        <thead class="border-t-2 border-blue-500">
          <tr>
            <th
              v-for="col in categoriesColumns"
              :key="col"
              :class="{
                'px-4 py-2': true,
                'w-1/4': col !== 'desc',
                'w-1/2': col === 'desc'
              }"
            >
              {{ $t(`categories.${col}`) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, i) in categories" :key="category.category_id" :class="{ 'bg-gray-200': i % 2 === 0 }">
            <td v-for="(col, index) in categoriesColumns" :key="`${col}-${index}`" class="border-b-2 border px-4 py-2">
              <div v-if="col !== 'actions'" v-html="getColumnValue(col, category, 'category')"></div>
              <div v-else class="flex justify-between">
                <Icon class="mx-4" name="pencil" @click="openEditCategory(category)" />
                <Icon class="mx-4" name="bin" @click="openRemoveModal('category', category)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-end w-full my-4">
        <Btn icon-btn icon="plus" @click="openEditCategory" />
      </div>
    </div>
    <RemoveModal v-if="modalId === 'remove-category'" @confirm="removeEntity('category')" @cancel="closeRemoveModal" />
    <EditCategoryModal
      v-if="modalId === 'category-edit'"
      :category="categoryToEdit"
      @confirm="saveCategory"
      @cancel="closeRemoveModal"
    />
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
    let categories = []
    try {
      const [travelsData, articlesData, categoriesData] = await Promise.all([
        $axios.get('/api/travels'),
        $axios.get('/api/articles'),
        $axios.get('/api/categories')
      ])
      travels = travelsData.data
      articles = articlesData.data
      categories = categoriesData.data
    } catch (error) {
      console.warn(error)
    }
    return {
      locale,
      otherLocale,
      travels,
      articles,
      categories
    }
  },
  data() {
    return {
      columns: ['title', 'countries', 'desc', 'steps', 'published', 'actions'],
      categoriesColumns: ['label', 'name', 'actions'],
      travelToDelete: null,
      categoryToEdit: {},
      categoryToDelete: null
    }
  },
  computed: {
    ...mapState('modal', ['modalId'])
  },
  methods: {
    ...mapMutations('modal', ['setVisible', 'setModalId']),
    async reloadData() {
      try {
        const [travelsData, articlesData, categoriesData] = await Promise.all([
          this.$axios.get('/api/travels'),
          this.$axios.get('/api/articles'),
          this.$axios.get('/api/categories')
        ])
        this.travels = travelsData ? travelsData.data : []
        this.articles = articlesData ? articlesData.data : []
        this.categories = categoriesData ? categoriesData.data : []
      } catch (error) {
        console.warn(error)
      }
    },
    getTravelSteps(travel) {
      const articles = this.articles
        .filter((art) => art.article_travel_id === travel.travel_id)
        .map((a) => `<a href="/articles/${a.article_id}">${a[`article_place_${this.locale}`]}</a>`)
        .join(', ')
      return articles
    },
    getColumnValue(col, entity, type = 'travel') {
      switch (col) {
        case 'steps':
          return this.getTravelSteps(entity)
        case 'countries':
          return entity[`${type}_${col}_${this.locale}`].join(', ')
        case 'published':
          // eslint-disable-next-line no-extra-boolean-cast
          return !!entity[`${type}_${col}_${this.locale}`]
            ? format(new Date(entity[`${type}_published_date_${this.locale}`]), 'dd/MM/yyyy')
            : ''
        case 'name':
          return entity[`${type}_${col}`]
        default:
          return entity[`${type}_${col}_${this.locale}`]
            ? entity[`${type}_${col}_${this.locale}`]
            : `<span class="italic text-gray-500">${entity[`${type}_${col}_${this.otherLocale}`]}</span>`
      }
    },
    openRemoveModal(type, entity) {
      if (type === 'travel') {
        this.travelToDelete = entity
        this.setModalId('remove-travel')
      } else {
        this.categoryToDelete = entity
        this.setModalId('remove-category')
      }
      this.setVisible(true)
    },
    closeRemoveModal() {
      this.setModalId(null)
      this.setVisible(false)
    },
    async removeEntity(entity = 'travel') {
      const obj = {
        travel: {
          endpoint: 'travels',
          i18n: 'travel',
          id: this.travelToDelete ? this.travelToDelete.travel_id : ''
        },
        category: {
          endpoint: 'categories',
          i18n: 'categories',
          id: this.categoryToDelete ? this.categoryToDelete.category_id : ''
        }
      }
      try {
        await this.$axios.delete(`/api/${obj[entity].endpoint}/${obj[entity].id}`)
        this.$toast.success(this.$t(`${obj[entity].i18n}.remove.success`))
        this.closeRemoveModal()
        this.travelToDelete = null
        this.reloadData()
      } catch (error) {
        console.warn(error)
        this.$toast.error(this.$t(`${obj[entity].i18n}.remove.error`))
      }
    },
    async saveCategory(category) {
      if (!category.category_id) {
        try {
          await this.$axios.post('/api/categories', category)
          this.$toast.success(this.$t('categories.save.success'))
          this.reloadData()
        } catch (error) {
          this.$toast.error(this.$t('categories.save.error'))
        }
      } else {
        try {
          await this.$axios.put(`/api/categories/${category.category_id}`, category)
          this.$toast.success(this.$t('categories.save.success'))
          this.reloadData()
        } catch (error) {
          this.$toast.error(this.$t('categories.save.error'))
        }
      }
    },
    openNewTravel() {
      this.$router.push('/travels/new')
    },
    openEditCategory(category = {}) {
      this.categoryToEdit = category
      this.setModalId('category-edit')
      this.setVisible(true)
    }
  }
}
</script>
