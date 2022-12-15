<template>
  <portal to="modal">
    <div class="p-8">
      <Select :options="anecdotes" option-label="anecdote_title" :value="anecdoteModel" @input="handleInput" />
      <div class="flex justify-end my-4">
        <Btn :label="$t('general.confirm')" additional-classes="confirm-anecdote" />
      </div>
    </div>
  </portal>
</template>

<script>
import VueTypes from 'vue-types'
import { mapMutations } from 'vuex'
export default {
  props: {
    anecdotes: VueTypes.array.def([])
  },
  data() {
    return {
      anecdoteModel: {}
    }
  },
  methods: {
    ...mapMutations('editor', ['setValue']),
    handleInput(input) {
      this.setValue(input)
      this.anecdoteModel = input
    }
  }
}
</script>
