<template>
  <div>
    <div v-if="!isEditing">
      <hr />
      <div class="my-4">
        <div class="flex justify-between mb-2">
          <p class="uppercase">{{ type }}</p>
          <div class="flex">
            <div
              v-for="action in actions"
              :key="action.key"
              class="rounded-full w-8 h-8 mx-1 flex justify-center items-center cursor-pointer border-2 border-black"
              @click="handleAction(action)"
            >
              <Icon :name="action.icon" />
            </div>
          </div>
        </div>
        <div v-if="type === 'image'">
          <img :src="content.src" class="h-48" />
        </div>
        <p v-else v-html="content"></p>
      </div>
    </div>
    <div v-else>
      <hr />
      <BlockEditorComp
        :id="id"
        edit
        :type="type"
        :content="['image', 'playlist'].includes(type) ? content : rawContent"
        @confirm="confirmModification"
        @cancel="isEditing = false"
      />
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
export default {
  props: {
    id: VueTypes.string.def('block'),
    position: VueTypes.number.def(0),
    type: VueTypes.string.def(null),
    content: VueTypes.any.def(null),
    rawContent: VueTypes.object.def({})
  },
  data() {
    return {
      isEditing: false,
      actions: [
        {
          key: 'edit',
          icon: 'pencil'
        },
        {
          key: 'remove',
          icon: 'cross'
        },
        {
          key: 'up',
          icon: 'arrow-up2'
        },
        {
          key: 'down',
          icon: 'arrow-down2'
        }
      ]
    }
  },
  methods: {
    handleAction(action) {
      this.$emit(action.key, this.id)
      if (action.key === 'edit') {
        this.isEditing = true
      }
    },
    confirmModification(type, content, id) {
      this.$emit('confirm', type, content, id)
      this.isEditing = false
    }
  }
}
</script>
