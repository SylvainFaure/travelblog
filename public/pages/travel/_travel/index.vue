<template>
  <div>
    <div class="header">
      <div class="travel__header">
        <h1 class="title travel__header-title">
          {{ travel.name }}
        </h1>
        <h2 class="title">
          {{ travel.description }}
        </h2>
        <a href="/index.html#/"><i style="font-size:24px" class="fa">&#xf060;</i></a>
      </div>
      <Map :address="travel.name" :steps="travel.articles" />
    </div>
    <div class="travel__articles-container">
      <div
        v-for="article in travel.articles"
        :key="article.article_id"
      >
        <div
          class="travel__article"
          :style="articleImg(article.cover)"
        >
          <div class="travel__article-photo">
            <h1 class="title travel__article-title">
              {{ article.title }}
            </h1>
            <h2>
              {{ article.place }}
            </h2>
            <p>{{ article.short_desc }}</p>
            <nuxt-link to="/article" params="{travel: travel.travel_id, article: article.id}">
              <a>
                <button
                  v-if="fr"
                  class="cta"
                >
                  Découvrez l'étape
                </button>
                <button
                  v-if="it"
                  class="cta"
                >
                  Scopri la tappa
                </button>
              </a>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <FloatActionBtn label="Gallery" :route="`${params.travel}/gallery`" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import formatTravel from '@/mixins/formatTravel'
import Map from '@/components/Map'
import FloatActionBtn from '@/components/FloatActionBtn'

export default {
  components: {
    Map,
    FloatActionBtn
  },
  validate({ params }) {
    return true
  },
  mixins: [formatTravel],
  data() {
    return {
      params: this.$route.params
    }
  },
  computed: {
    ...mapState(['travels', 'articles', 'assets']),
    travel() {
      const filteredTravel = this.travels.filter((travel) => {
        return Number(this.$route.params.travel) === travel.travel_id
      })
      const toRet = this.formatTravel(filteredTravel[0], this.filteredArticles)
      return toRet
    },
    formattedTravel() {
      return this.formatTravel(this.travel, this.filteredArticles)
    },
    filteredArticles() {
      return this.articles.filter((art) => {
        return art.article_travel_id === Number(this.$route.params.travel)
      })
    },
    fr() {
      return true
    },
    it() {
      return false
    }
  },
  methods: {
    articleImg(cover) {
      const url = process.env.AWS_BUCKET_PATH
      return `background: url('${url}/thumb/
        ${this.travel.cover}
      '); background-repeat: no-repeat; background-position: center; background-size: cover;`
    }
  }
}
</script>
<style lang="scss">
.travel {
  &__header {
    font-size: 20px;
    width: 30%;
    text-align: left;
    position: absolute;
    top: 100px;
    z-index: 1000;
  }
  &__article {
    &s-container {
      margin-top: 580px;
    }
    /*background-color: #E1F5FE;*/
    padding: 0px 10px 0px 0px;
    margin: 15px auto;
    max-width: 85%;
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
