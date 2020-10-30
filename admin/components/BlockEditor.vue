<template>
  <div class="mt-16">
    <h4 v-if="label" class="label font-bold my-4">
      <span class="bg-white z-10 pr-6">{{ label }}</span>
    </h4>
    <div class="flex justify-center flex-wrap mb-4">
      <div
        v-for="action in actions"
        :key="action.key"
        class="border-2 border-black w-24 h-24 rounded-full flex flex-col items-center justify-center text-sm font-bold cursor-pointer text-center p-4 m-2"
        @click="activeAction = action.key"
      >
        <p>{{ action.label }}</p>
        <div><Icon :name="action.icon" /></div>
      </div>
    </div>
    <div v-if="activeAction" class="my-4">
      <BlockEditorComp
        :type="activeAction"
        :assets="assets"
        @confirm="confirmModification"
        @cancel="activeAction = null"
      />
    </div>
    <div class="my-4">
      <BlockPreview
        v-for="(block, i) in orderedBlocks"
        :key="`${block.type}-${i}-${block.position}`"
        v-bind="block"
        @up="handleOrder('up', $event)"
        @down="handleOrder('down', $event)"
        @remove="handleRemove"
        @confirm="confirmModification"
      />
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  props: {
    label: VueTypes.string.def(''),
    blocks: VueTypes.array.def([]),
    addons: VueTypes.array.def(null),
    assets: VueTypes.array.def([])
  },
  data() {
    const defaultActions = [
      { key: 'paragraph', label: 'Paragraphe', icon: 'paragraph-left' },
      {
        key: 'subtitle',
        label: 'Sous-titre',
        icon: 'pilcrow'
      },
      {
        key: 'image',
        label: 'Image',
        icon: 'image'
      },
      {
        key: 'catch',
        label: "Phrase d'accroche",
        icon: 'bold'
      },
      {
        key: 'playlist',
        label: 'Playlist',
        icon: 'spotify'
      }
    ]
    const addonsActions = this.addons.map((addon) => {
      if (addon === 'map-description') {
        addon = { key: 'map-description', label: 'Description avec carte', icon: 'map' }
      }
      if (addon === 'anecdote') {
        addon = { key: 'anecdote', label: 'Description avec anecdotes', icon: 'file-empty' }
      }
      return addon
    })

    return {
      orderedBlocks: [],
      activeAction: null,
      actions: [...defaultActions, ...addonsActions]
    }
  },
  mounted() {
    this.orderedBlocks = this.blocks ? this.blocks.sort((a, b) => a.position - b.position) : []
  },
  methods: {
    confirmModification(type, content, id) {
      if (id === 'new-block') {
        console.log('new block', type, content)
        this.createNewBlock(type, content)
        this.activeAction = null
      } else {
        this.orderedBlocks = this.orderedBlocks.map((block) => {
          if (block.id === id) {
            if (type === 'image') {
              block.content = content.content
            } else {
              block = { ...block, ...content }
            }
          }
          return block
        })
      }
    },
    createNewBlock(type, content) {
      const randomId = Math.floor(Math.random() * 1000)
      const component = {
        id: `${type}-${randomId}`,
        type,
        position: this.orderedBlocks.length,
        ...content
      }
      this.orderedBlocks.push(component)
    },
    handleOrder(direction, id) {
      const currentBlock = this.orderedBlocks.find((block) => block.id === id)
      if (direction === 'up' && currentBlock.position > 0) {
        const previousBlockId = this.orderedBlocks.find((block) => block.position === currentBlock.position - 1).id
        this.orderedBlocks = this.orderedBlocks
          .map((b) => {
            if (b.id === id) {
              b.position -= 1
            } else if (b.id === previousBlockId) {
              b.position += 1
            }
            return b
          })
          .sort((a, b) => a.position - b.position)
      } else if (direction === 'down' && currentBlock.position < this.orderedBlocks.length - 1) {
        const nexBlockId = this.orderedBlocks.find((block) => block.position === currentBlock.position + 1).id
        this.orderedBlocks = this.orderedBlocks
          .map((b) => {
            if (b.id === id) {
              b.position += 1
            } else if (b.id === nexBlockId) {
              b.position -= 1
            }
            return b
          })
          .sort((a, b) => a.position - b.position)
      }
      // console.log(this.orderedBlocks)
    },
    handleRemove(id) {
      const block = this.orderedBlocks.find((b) => b.id === id)
      this.orderedBlocks = this.orderedBlocks
        .map((b) => {
          if (b.position > block.position) {
            b.position -= 1
          }
          return b
        })
        .filter((b) => b.id !== id)
    },
    getBlocks() {
      return this.orderedBlocks
    }
  }
}
</script>
