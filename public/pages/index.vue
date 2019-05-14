<template>
  <div>
    <div class="sticky" />
    <header class="home__header">
      <!--<change-lang class="sticky_child"></change-lang>-->
      <div class="main-title sticky_child">
        <ImageItem class="img-full-screen" :external="true" :gallery="false" :asset="asset" />
        <h1 class="title">
          Cartes de voyage
        </h1>
      </div>
      <!--
        <video ng-if="vm.isDesktop" autoplay loop class="video-background">
          <source src="../assets/india-street.mp4" type="video/mp4" />Your browser does not support the video tag. I suggest you upgrade your browser.
        </video>
      -->

      <div
        class="arrow-container"
        @click="scrollDown()"
      >
        <div class="arrow">
          >
        </div>
        <div class="arrow">
          >
        </div>
      </div>
    </header>
    <main class="home__main">
      <section class="home__main-trips">
        <h2 class="home__main-trips-title">
          {{ label_trips }}
        </h2>
        <CountriesCard />
      </section>
      <aside class="home__main-articles">
        <h2 class="home__main-articles-title">
          {{ label_last_articles }}
        </h2>
        <div class="home__main-articles-list">
          <div
            v-for="article in articles"
            :key="article.article_id"
            class="home__main-articles-list-item"
          >
            <a ui-sref="post({country: article.article_country_id, post: article.article_id})">
              <div><span class="italic">{{ article.article_title }}</span> {{ label_in }} {{ article.article_travel }}</div>
              <div>{{ label_published }} {{ article.article_published_date }}</div>
            </a>
          </div>
        </div>
      </aside>
    </main>
  </div>
</template>

<script>
import CountriesCard from '@/components/CountriesCard'
import ImageItem from '@/components/ImageItem'

export default {
  components: {
    CountriesCard,
    ImageItem
  },
  data() {
    return {
      label_published: 'Publié',
      label_trips: 'Voyages',
      label_in: 'Dans',
      label_last_articles: 'Derniers articles',
      label_discover: 'Découvrez',
      asset: {
        asset_src: 'https://images.unsplash.com/photo-1555414244-80c33ca2e497?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
        asset_title_fr: 'Accueil',
        asset_title_it: 'Homepage',
        asset_place_fr: 'Inde',
        asset_place_it: 'India'
      }
    }
  },
  computed: {
    articles() {
      return this.$store.getters.articles
    }
  },
  methods: {
    scrollDown() {
      const homeHeight = document.getElementsByClassName('home__header')[0]
        .offsetHeight
      window.scroll({ top: homeHeight, left: 0, behavior: 'smooth' })
      // $('html, body').animate( { scrollTop: $('.home__main').offset().top }, 750 )
    }
  }
}
</script>

<style lang="scss">
.title {
  font-family: 'IM Fell DW Pica', serif;
  font-style: italic;
  font-size: 2em;
  z-index: 100;
}
.main-title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  height: 80vh;
  &.sticked {
    height: auto;
    > .title {
      margin: 0 0.5em;
      font-size: 1.5em;
    }
  }
}
.img-full-screen {
  min-height: 100% !important;
  height: auto;
  min-width: 1200px;
  position: absolute !important;
  left: 50% !important;
  top: 50% !important;
  transform: translate(-50%, -50%) !important;
  opacity: 1 !important;
  transition: opacity 0.5s ease 0s !important;
}
.arrow {
    font-family: 'IM Fell DW Pica', serif;
    font-size: 3em;
    line-height: 0.3;
    transform: rotate(90deg) translateY(-3px);
    z-index: 100;

  &-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    cursor: pointer;
    bottom: 30px;
    left: 50%;
    z-index: 100;
    border: 2px solid;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    background-color: rgba(255, 255, 255, 0.2);
  }
}
.sticky {
  position: fixed;
  top: 0;
  left: 0;
  height: 4em;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  &_child {
    &.sticked {
      position: fixed;
      top: 0;
    }
  }
}
.home {
  &__header {
    position: relative;
    width: 100% !important;
    height: 100vh !important;
    overflow: hidden;
    min-height: 660px !important;
    padding: 1em;
  }
  &__main {
    background-color: #fde3a7;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    &-trips {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
      width: 75%;
      padding: 2em 1em;
      transition: padding 0.3s ease;
      &-title {
        margin: 1em;
        font-size: 30px;
        font-family: 'IM Fell DW Pica', serif;
        width: 100%;
      }
    }

    &-articles {
      display: flex;
      flex-direction: column;
      width: 25%;
      border-left: 1px solid;
      border-color: rgba(0, 0, 0, 0.2);
      padding: 2em 1em;
      transition: padding 0.3s ease;
      background-color: rgba(255, 255, 255, 0.2);
      &-title {
        margin: 1em 0;
        font-size: 30px;
        font-family: 'IM Fell DW Pica', serif;
        width: 100%;
      }
      &-list {
        padding: 2em 0;
        &-item {
          padding: 0 0 1em 0;
        }
      }
    }
  }
}
</style>
