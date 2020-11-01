<template>
  <div v-if="mounted">
    <h4 class="font-bold text-center text-md">{{ title }}</h4>
    <Select
      :options="filteredPublished"
      :label="$t(`highlights.${type}.select`)"
      :option-label="`${type}_title_${locale}`"
      class="min-w-1/3"
      :value="null"
      @input="handleSelected"
    />
    <div class="my-4">
      <h4 class="font-bold">{{ $t(`highlights.${type}.selected`) }}</h4>
      <p v-if="!selected.length" class="text-sm">{{ $t(`highlights.${type}.selected_empty`) }}</p>
    </div>
    <draggable :list="selected">
      <div v-for="entity in selected" :key="`${type}-${entity[`${type}_id`]}`">
        <EntityRow :type="type" :entity="entity" />
      </div>
    </draggable>

    <div class="my-4">
      <h4 class="font-bold">{{ $t(`highlights.${type}.unpublished_title`) }}</h4>
      <p class="text-sm mb-4">{{ $t(`highlights.${type}.unpublished_subtitle`) }}</p>
      <div v-for="entity in unpublished" :key="`${type}-${entity[`${type}_id`]}`">
        <EntityRow
          :type="type"
          :entity="entity"
          unpublished
          @edit="$emit('edit', type, entity[`${type}_id`])"
          @publish="$emit('publish', type, entity)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  props: {
    type: VueTypes.string.def('travels'),
    title: VueTypes.string.def(''),
    highlighted: VueTypes.array.def(null),
    published: VueTypes.array.def([]),
    unpublished: VueTypes.array.def([])
  },
  data() {
    return {
      locale: 'fr',
      selected: [],
      mounted: false
    }
  },
  computed: {
    filteredPublished() {
      return this.published.reduce((acc, curr) => {
        const isInSelected = this.selected.find((selected) => curr[`${this.type}_id`] === selected[`${this.type}_id`])
        if (!isInSelected) {
          acc.push(curr)
        }
        return acc
      }, [])
    }
  },
  mounted() {
    this.locale = this.$i18n.locale
    if (this.highlighted) {
      this.selected = this.highlighted
    }
    console.log(this.selected)
    this.mounted = true
  },
  methods: {
    handleSelected(selected) {
      this.selected.push(selected)
    },
    getSelected() {
      return this.selected
    }
  }
}
</script>
