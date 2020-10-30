<template>
  <portal to="modal">
    <div>
      <div class="h-full flex">
        <div class="m-8">
          <img :src="image.asset_src" class="h-48" />
        </div>
        <div class="mr-8 mb-8 max-w-1/2">
          <InputText v-model="model.name" :label="$t('assets.edit.name')" disabled />
          <InputText v-model="model.title" :label="$t('assets.edit.title')" />
          <Textarea v-model="model.description" :label="$t('assets.edit.description')" />
          <Select
            v-model="model.article_ids"
            multiple
            :label="$t('assets.edit.articles')"
            :options="articles"
            :option-label="`article_title_${locale}`"
          />
          <Select
            v-model="model.travel"
            :label="$t('assets.edit.travel')"
            :options="travels"
            :option-label="`travel_title_${locale}`"
          />
        </div>
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
    image: VueTypes.object.def(null),
    articles: VueTypes.array.def([]),
    travels: VueTypes.array.def([])
  },
  data() {
    return {
      locale: '',
      model: {
        name: '',
        title: '',
        description: '',
        article_ids: [],
        travel: null
      }
    }
  },
  mounted() {
    const locale = this.$i18n.locale
    this.locale = locale
    const { asset_name, asset_article_ids, asset_travel_id } = this.image
    this.model = {
      name: asset_name,
      title: this.image[`asset_title_${locale}`],
      description: this.image[`asset_desc_${locale}`],
      article_ids: asset_article_ids
        ? this.articles.filter((article) => asset_article_ids.includes(article.article_id))
        : [],
      travel: asset_travel_id ? this.travels.find((travel) => travel.travel_id === asset_travel_id) : null
    }
  },
  methods: {
    ...mapMutations('modal', ['setVisible', 'setModalId']),
    handleConfirm() {
      this.$emit('confirm', this.model, this.image)
      this.closeModal()
    },
    handleCancel() {
      this.closeModal()
    },
    closeModal() {
      this.setModalId(null)
      this.setVisible(false)
    },
    handleReduce(option) {
      return option[`article_title_${this.locale}`]
    }
  }
}
</script>
