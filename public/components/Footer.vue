<template>
  <footer class="footer">
    <Sitemap />
    <SocialLinks />
  </footer>
</template>
<script>
import Sitemap from '@/components/Sitemap'
import SocialLinks from '@/components/SocialLinks'

export default {
  components: {
    Sitemap,
    SocialLinks
  }
}
</script>
<style lang="scss">
.footer {
  width: 100%;
  min-height: 5em;
  padding: 2em;
  background-color: $color-secondary;
  border-top: 1px solid black;
}
</style>
