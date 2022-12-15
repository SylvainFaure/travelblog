<template>
  <div>
    <h4 v-if="label" class="label font-bold my-4">
      <span class="bg-white z-10 pr-6">{{ label }}</span>
    </h4>
    <date-picker v-model="dateModel" type="date" range :placeholder="placeholder" value-type="timestamp" />
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/fr'
export default {
  components: {
    DatePicker
  },
  props: {
    label: VueTypes.string.def(null),
    model: VueTypes.array.def(null),
    placeholder: VueTypes.string.def(null)
  },
  data() {
    return {
      dateModel: [new Date(), new Date()]
    }
  },
  watch: {
    dateModel(n, o) {
      if (n !== o) {
        this.$emit('change', n)
      }
    }
  },
  mounted() {
    if (this.model) {
      this.dateModel = this.model
    }
  }
}
</script>
<style lang="scss">
.mx-datepicker {
  width: 100%;
}
.mx-input {
  @apply border;
  border-color: #e2e8f0;
}
</style>
