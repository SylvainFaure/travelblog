<template>
  <div>
    <div :id="`editor-${name}`"></div>
    <AnecdoteModal v-if="modalId === 'anecdote'" :anecdotes="anecdotes" />
    <MapPointModal v-if="modalId === 'map-point'" />
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import { mapState } from 'vuex'
import EditorJS from '@editorjs/editorjs'
import List from '@editorjs/list'
import AddMapPoint from '../utils/custom-editor-actions/addmappoint'
import AddAnecdote from '../utils/custom-editor-actions/addanecdote'
import { jsonToHTML } from '../utils/editor'

export default {
  props: {
    name: VueTypes.string.def('editor'),
    data: VueTypes.object.def({}),
    anecdotes: VueTypes.array.def([]),
    tools: VueTypes.array.def([])
  },
  data() {
    return {
      editor: null,
      saveTrigger: false,
      toolsMap: {
        list: List,
        map: {
          class: AddMapPoint,
          inlineToolbar: true,
          config: {}
        },
        anecdote: {
          class: AddAnecdote,
          inlineToolbar: true
        }
      }
    }
  },
  computed: {
    ...mapState('modal', ['modalId'])
  },
  watch: {
    saveTrigger(n, o) {
      if (n !== o) {
        this.saveContent()
      }
    }
  },
  mounted() {
    this.editor = new EditorJS({
      holder: `editor-${this.name}`,
      tools: this.getTools(),
      data: this.data
    })
  },
  methods: {
    getTools() {
      const toolsObject = {}
      const tools = [...this.tools, 'list']
      tools.map((tool) => {
        toolsObject[tool] = this.toolsMap[tool]
      })
      return toolsObject
    },
    async saveContent() {
      const rawContent = await this.editor.save()
      const content = jsonToHTML(rawContent)
      this.$emit('save', { content, rawContent })
      return { content, rawContent }
    }
  }
}
</script>
<style>
[id^='editor'] {
  width: 100%;
  min-width: 50vw;
  padding: 20px;
  border: 1px solid lightgray;
  min-height: 200px;
}
</style>
