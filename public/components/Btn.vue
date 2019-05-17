<template>
  <component
    :is="tagName"
    :to="isRoute ? link : null"
    :href="location"
    :type="type || null"
    class="btn"
    :class="getClassName()"
    @click="$emit('click', $event)"
    @click.native="$emit('click', $event)"
  >
    <icon
      v-if="icon"
      :name="icon"
      class="btn__icon"
    />
    <slot />
  </component>
</template>

<script>
export default {
  name: 'Btn',
  props: {
    link: {
      type: [String, Object],
      default: ''
    },
    type: {
      type: String,
      default: 'primary'
    },
    icon: {
      type: String,
      default: null
    }
  },
  computed: {
    isRoute() {
      return typeof this.link === 'object'
    },
    tagName() {
      /* eslint-disable-next-line */
      return !!this.link ? (this.isRoute ? 'nuxt-link' : 'a') : 'button'
    },
    tabIndex() {
      return this.focusable ? null : '-1'
    },
    location() {
      return this.link ? (this.isRoute ? this.localePath(this.link) : this.link) : null
    }
  },
  methods: {
    getClassName() {
      let className = ''
      className += this.type
      return className
    }
  }
}
</script>
<style lang="scss">
.btn {
  &.primary {
    padding: 0.5em 1em;
    border: 2px solid $color-dark;
    transition: color background-color $transition-timing ease-in-out;
    &:hover {
      color: $color-light;
      background-color: $color-dark;
    }
  }
}

</style>
