<template>
  <header class="header spaced sticky">
    <div>title</div>
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
  z-index: 100;

  display: flex;
  justify-content: space-between;

  &.spaced {
    padding: 1em;
  }
}
</style>
