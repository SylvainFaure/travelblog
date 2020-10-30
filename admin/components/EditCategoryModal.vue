<template>
  <portal to="modal">
    <div>
      <div class="m-8">
        <InputText v-model="name" :label="$t('categories.name')" />
        <InputText v-model="label" :label="$t('categories.label')" />
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
    category: VueTypes.object.def({})
  },
  data() {
    return {
      name: '',
      label: '',
      locale: '',
      mounted: false
    }
  },
  mounted() {
    this.locale = this.$i18n.locale
    this.name = this.category && this.category.category_name ? this.category.category_name : ''
    this.label =
      this.category && this.category[`category_label_${this.locale}`]
        ? this.category[`category_label_${this.locale}`]
        : ''
    this.mounted = true
  },
  methods: {
    ...mapMutations('modal', ['setVisible', 'setModalId']),
    handleConfirm() {
      const otherLocale = this.locale === 'fr' ? 'it' : 'fr'
      this.$emit('confirm', {
        category_id: this.category.category_id,
        category_name: this.name,
        [`category_label_${this.locale}`]: this.label,
        [`category_label_${otherLocale}`]: this.category[`category_label_${otherLocale}`] || ''
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
