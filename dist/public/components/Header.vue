<template>
  <header class="header spaced sticky">
    <div>
      <nuxt-link to="/">
        {{ $t('main_title') }}
      </nuxt-link>
    </div>
    <div>
      <ChangeLang />
    </div>
  </header>
</template>
<script>
import ChangeLang from '@/components/ChangeLang'
export default {
  components: {
    ChangeLang
  }
}
</script>
<style lang="scss">
.header {
  width: 100%;
  z-index: 10000;

  display: flex;
  justify-content: space-between;

  &.spaced {
    padding: 1em;
  }
  &.sticky {
  position: fixed;
  top: 0;
  left: 0;
  color: whitesmoke;
}
}
</style>
