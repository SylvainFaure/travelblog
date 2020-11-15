<template>
  <div class="my-2">
    <div v-if="type === 'image'" class="flex justify-center">
      <div class="h-full flex justify-center">
        <img
          v-if="edit || model.desktop"
          :src="!model.desktop ? content.desktop.asset_src : model.desktop.asset_src"
          class="h-48"
        />
        <div :class="{ 'h-full flex items-center ml-4': edit || model.desktop, 'flex justify-center mx-4': !edit }">
          <Btn icon-btn icon="pencil" :label="$t('general.desktop')" @click="selectImage('desktop')" />
        </div>
      </div>
      <div class="h-full flex justify-center">
        <img
          v-if="edit || model.mobile"
          :src="!model.mobile ? content.mobile.asset_src : model.mobile.asset_src"
          class="h-48"
        />
        <div :class="{ 'h-full flex items-center ml-4': edit || model.mobile, 'flex justify-center mx-4': !edit }">
          <Btn icon-btn icon="pencil" :label="$t('general.mobile')" @click="selectImage('mobile')" />
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
        :anecdotes="data ? data.anecdotes : null"
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
      :picked="edit ? content[imageType] : null"
      @confirm="handleConfirmImage"
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
      imageType: 'desktop',
      model: {
        desktop: null,
        mobile: null,
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
      return type === 'map-description' ? ['map'] : type === 'anecdote' ? ['anecdote'] : []
    },
    selectImage(type) {
      this.imageType = type
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
            desktop: this.model.desktop || this.content.desktop,
            mobile: this.model.mobile || this.content.mobile
          }
        }
      } else if (this.type === 'playlist') {
        content = { content: this.model[this.type] }
      }
      this.$emit('confirm', this.type, content, this.id)
    },
    handleCancel() {
      this.$emit('cancel')
    },
    handleConfirmImage(e) {
      this.model[this.imageType] = e
    }
  }
}
</script>
