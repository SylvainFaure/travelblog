<template>
  <div>
    <Header />
    <div class="header">
      <Map :address="travel.countries.split(',')[0]" :steps="travelSteps" />
    </div>
    <section class="travel__body">
      <div>
        <div class="travel__header">
          <h1 class="title travel__header-title">
            {{ travel.name }}
          </h1>
          <h2 class="title">
            {{ travel.description }}
          </h2>
          <a href="/"><i style="font-size:24px" class="fa">&#8604;</i></a>
        </div>
        <div class="travel__body-description">
          Travel description
        </div>
      </div>
      <transition name="fade">
        <div v-if="travelArticles" class="travel__articles-container">
          <div
            v-for="article in travelArticles"
            :key="article.article_id"
          >
            <article-card :article="article" :travel-slug="$route.params.travelSlug" />
          </div>
        </div>
      </transition>
    </section>
    <FloatActionBtn label="Gallery" :route="`${params.travelSlug}/${$t('routes.gallery')}`" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import formatTravel from '@/mixins/formatTravel'
import getTravelIdFromSlug from '@/mixins/formatRoute'
import Header from '@/components/Header'
import ArticleCard from '@/components/ArticleCard'
import Map from '@/components/Map'
import FloatActionBtn from '@/components/FloatActionBtn'

export default {
  components: {
    Map,
    ArticleCard,
    FloatActionBtn,
    Header
  },
  validate({ params }) {
    return true
  },
  mixins: [formatTravel, getTravelIdFromSlug],
  data() {
    return {
      params: this.$route.params,
      travelId: undefined
    }
  },
  computed: {
    ...mapState(['travels', 'articles', 'assets']),
    travel() {
      const filteredTravel = this.travels.filter((travel) => {
        return this.travelId === travel.travel_id
      })
      const toRet = this.formatTravel(filteredTravel[0], this.filteredArticles)
      return toRet
    },
    formattedTravel() {
      return this.formatTravel(this.travel, this.filteredArticles)
    },
    travelArticles() {
      return this.articles.filter((art) => {
        return art.article_travel_id === this.travelId
      })
    },
    travelSteps() {
      return this.travelArticles.map(art => art.article_slug)
    },
    fr() {
      return true
    },
    it() {
      return false
    }
  },
  created() {
    this.travelId = this.$route.params.travelId ? this.$route.params.travelId : this.getTravelIdFromSlug(this.$route.params.travelSlug)
  }
}
</script>
<style lang="scss">
.travel {
  &__header {
    font-size: 1.5em;
    text-align: left;
    min-height: 15em;
    top: 4em;
    left: 2em;
    padding: 1em;
    z-index: 100;
    background-color: rgba(255,255,255,0.2);
    border: 2px solid black;
  }
  &__body {
    position: absolute;
    width: 85%;
    top: 4em;
    left: 4em;
    display: grid;
    grid-template-columns: 45% auto;
    &-description {
      margin-top: 2em;
    }
  }
  &__articles {
    &-container {
      margin-top: 50vh;
    }
  }
  &-photo {
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-family: 'Slabo 27px', serif;
    font-size: 15px;
    text-align: center;
    position: relative;
    vertical-align: top;
    min-height: 400px;
    opacity: 1 !important;
    & p {
      margin-top: 0px;
    }
  }
}
</style>
