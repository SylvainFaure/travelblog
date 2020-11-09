<template>
  <div class="my-2">
    <div v-if="type === 'image'">
      <div class="h-full flex justify-center">
        <img v-if="edit || model.image" :src="!model.image ? content.src : model.image.asset_src" class="h-48" />
        <div :class="{ 'h-full flex items-center ml-4': edit || model.image, 'flex justify-center': !edit }">
          <Btn icon-btn icon="pencil" @click="selectImage" />
        </div>
      </div>
    </div>
    <div v-else-if="type === 'playlist'">
      <InputText v-model="model.playlist" :value="edit ? content : ''" />
    </div>
    <div v-else>
      <TextEditor
        ref="textEditor"
        :name="`block-editor-comp-${type}`"
        :data="edit ? content : null"
        :tools="getTools(type)"
      />
    </div>
    <div class="flex justify-center my-2">
      <Btn :label="$t('general.confirm')" @click="handleConfirm" />
      <Btn :label="$t('general.cancel')" type="secondary" @click="handleCancel" />
    </div>
    <AssetsModal
      v-if="modalId === 'editor-asset'"
      :assets="assets"
      :data="data"
      :picked="edit ? content.originalAsset : null"
      @confirm="model.image = $event"
    />
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import { mapState, mapMutations } from 'vuex'
export default {
  props: {
    id: VueTypes.string.def('new-block'),
    type: VueTypes.string.def('paragraph'),
    content: VueTypes.any.def(null),
    edit: VueTypes.bool.def(false),
    assets: VueTypes.array.def([]),
    data: VueTypes.object.def({})
  },
  data() {
    return {
      model: {
        image: null,
        playlist: ''
      }
    }
  },
  computed: {
    ...mapState('modal', ['modalId'])
  },
  methods: {
    ...mapMutations('modal', ['setVisible', 'setModalId']),
    getTools(type) {
      return type === 'map-description' ? ['map'] : type === 'anecdotes' ? ['anecdote'] : []
    },
    selectImage() {
      this.setModalId('editor-asset')
      this.setVisible(true)
    },
    async handleConfirm() {
      let content = ''
      if (!['image', 'playlist'].includes(this.type)) {
        content = await this.$refs.textEditor.saveContent()
      } else if (this.type === 'image') {
        content = {
          content: {
            name: this.model[this.type].asset_name,
            originalAsset: this.model[this.type],
            src: this.model[this.type].asset_src
          }
        }
      } else if (this.type === 'playlist') {
        content = { content: this.model[this.type] }
      }
      this.$emit('confirm', this.type, content, this.id)
    },
    handleCancel() {
      this.$emit('cancel')
    }
  }
}
</script>
