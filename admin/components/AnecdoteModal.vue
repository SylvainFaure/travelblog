<template>
  <portal to="modal">
    <div class="p-8">
      <Select :options="anecdotes" label="anecdote_title" :value="anecdoteModel" @input="handleInput" />
      <div class="flex justify-end my-4">
        <Btn :label="$t('general.confirm')" additional-classes="confirm-anecdote" />
      </div>
    </div>
  </portal>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      anecdoteModel: {}
    }
  },
  computed: {
    ...mapState(['anecdotes'])
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
