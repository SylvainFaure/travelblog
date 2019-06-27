<template>
  <div>
    <Header />
    <section class="home__header">
      <div class="main-title">
        <ImageItem class="img-full-screen" :external="true" :gallery="false" :asset="asset" />
        <h1 class="title">
          Cartes de voyage
        </h1>
      </div>
      <div
        class="arrow-container"
        @click="scrollDown()"
      >
        <div class="arrow">
          >
        </div>
      </div>
    </section>
    <main class="home__main">
      <section class="home__main-trips">
        <h2 class="home__main-trips-title">
          {{ $t('label_trips') }}
        </h2>
        <CountriesCard />
      </section>
      <sidebar
        class="home__sidebar"
        :class="{'opened' : isOpen}"
        :opened="isOpen"
        @open="isOpen = true"
        @close="isOpen = false"
      >
        <div class="home__main-articles">
          <h2 class="home__main-articles-title">
            {{ $t('label_last_articles') }}
          </h2>
          <div class="home__main-articles-list">
            <div
              v-for="article in _articles"
              :key="article.article_id"
              class="home__main-articles-list-item"
            >
              <a data-url="post({country: article.article_country_id, post: article.article_id})">
                <div><span class="italic">{{ article.title }}</span> {{ $t('label_in') }} {{ article.travel }}</div>
                <div>{{ $t('label_published') }} {{ article.published_date }}</div>
              </a>
            </div>
          </div>
        </div>
      </sidebar>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import CountriesCard from '@/components/CountriesCard'
import ImageItem from '@/components/ImageItem'
import formatArticle from '@/mixins/formatArticle'

export default {
  components: {
    CountriesCard,
    ImageItem,
    Header,
    Sidebar
  },
  mixins: [formatArticle],
  data() {
    return {
      asset: {
        asset_src: 'https://images.unsplash.com/photo-1555414244-80c33ca2e497?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
        asset_title_fr: 'Accueil',
        asset_title_it: 'Homepage',
        asset_place_fr: 'Inde',
        asset_place_it: 'India'
      },
      isOpen: false
    }
  },
  computed: {
    ...mapState(['articles']),
    _articles() {
      return this.articles.map(article => this.formatArticle(article))
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
  z-index: 100;
}
.main-title {
  @include flex(row, center, center);
  height: 80vh;
  color: $color-light;
}
.img-full-screen {
  position: absolute !important;
  min-height: 100% !important;
  height: auto;
  min-width: 1500px;
  left: 50% !important;
  top: 50% !important;
  transform: translate(-50%, -50%) !important;
  opacity: 0.8 !important;
  transition: opacity 0.5s ease 0s !important;
}
.arrow {
    font-size: 3em;
    transform: rotate(90deg);
    z-index: 100;

  &-container {
    @include flex(column, center, center);
    position: absolute;
    cursor: pointer;
    bottom: 30px;
    left: 48%;
    z-index: 100;
    border: 2px solid $color-light;
    color: $color-light;
    border-radius: 50%;
    width: 60px;
    height: 60px;
  }
}
.sticky {
  position: fixed;
  top: 0;
  left: 0;
  color: whitesmoke;
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
    @include flex(row, space-between, flex-start);
    flex-wrap: nowrap;
    &-trips {
      @include flex(row, flex-start, flex-start);
      flex-wrap: wrap;
      //width: 100%;
      padding: 2em 1em;
      transition: padding $transition-timing ease;
      &-title {
        margin: 0 0 -1em 0.5em;
        z-index: 10;
        font-size: 6em;
        font-weight: 400;
        background: -webkit-linear-gradient(top, rgba(0,0,0, 1) 50%, rgba(255, 255, 255, 1) 50%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    &-articles {
      display: flex;
      flex-direction: column;
      padding: 2em 1em;
      transition: padding $transition-timing ease;
      &-title {
        margin: 1em 0;
        font-size: 30px;
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
  &__sidebar {
    position: relative;
    top: 45vh;
    right: 25px;
    &.opened {
      position: sticky;
      top: 0;
      right: 0;
      min-width: 300px;
      height: 100vh;
    }
  }
}
</style>
