<template>
  <div>
    <transition name="slide-left" mode="out-in">
      <aside v-if="opened" class="sidebar">
        <div class="sidebar__close clickable" @click="close">
          <span>&#9587;</span>
        </div>
        <slot class="sidebar__slot" />
      </aside>
      <div v-if="!opened" class="sidebar__openbtn clickable" @click="open">
        <div>
          +
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    opened: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    open() {
      this.$emit('open')
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss">
.sidebar {
  position: relative;
  height: 100%;
  background-color: rgba(232,232,232,1);

  &__slot {
    width: 0;
  }

  &__close {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  &__openbtn {
    @include flex(row, center, center);
    height: 100%;
    width: 15%;
    float: right;
    font-size: 3em;
  }
}

.slide-left-enter, .slide-left-leave-to {
  transform: translateX(25%);
  opacity: 0;
}
.slide-left-enter-active {
  transition: all 0.3s ease-in-out;
}
.slide-left-leave-active {
  transition: all 0 ease-in-out
}
</style>
