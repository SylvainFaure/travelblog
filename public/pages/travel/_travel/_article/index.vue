<template>
  <div>
    {{ $route.params }}
  </div>
</template>
<script>
import formatArticle from '@/mixins/formatArticle'

export default {
  mixins: [ formatArticle ]
}
</script>
<style lang="scss">

</style>
