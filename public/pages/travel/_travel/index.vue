<template>
  <div>
    <div class="header">
      <div class="travel__header">
        <h1 class="title travel__header-title">{{travel.name}}</h1>
        <h2 class="title"> {{travel.description}} </h2>
        <a href="/index.html#/"><i style="font-size:24px" class="fa">&#xf060;</i></a>	
      </div>
      <Map address="travel.name" steps="travel.articles" />
      ola {{ $route.params }}
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
            <h1 class="title travel__article-title">{{ article.title }}</h1>
            <h2>{{ article.place }}</h2>
            <p>{{ article.short_desc }}</p>
            <nuxt-link to="/article" params="{travel: this.travel.travel_id, article: article.id}">
              <a>
                <button
                  v-if="this.fr"
                  class="cta"
                >
                  Découvrez l'étape
                </button>
                <button
                  v-if="this.it"
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
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Map from '@/public/components/Map'

export default {
  components: {
    Map
  },
  validate({ params }) {
    return true
  },
  data() {
    return {
      params: this.$router.params
    }
  },
  computed: {
    ...mapState(['travels', 'articles', 'assets']),
    travel() {
      const travel = this.travels.filter(travel => {
        return this.$route.params.travelId == travel.travel_id
      })
      return formattedTravel(travel)
    },
    articles() {
      return this.articles.filter(art => {
        return art.article_travel_id == travel.travel_id
      })
    },
    articleImg(cover) {
      const url = process.env.AWS_BUCKET_PATH;
      return `background: url('${url}/thumb/${article.cover}'); background-repeat: no-repeat; background-position: center; background-size: cover;`
    },
    formattedTravel(travel) {
      // FORMAT TRAVEL WITH LANG
      const lang = 'fr'
      if (lang == 'fr') {
        travel.name = travel.travel_name_fr
        travel.description = travel.travel_desc_fr
        travel.articles = []
        this.articles.forEach(art => {
          let article = {
            id: art.article_id,
            title: art.article_title_fr,
            place: art.article_place_fr,
            cover: art.article_cover,
            step: art.article_step,
            slug: art.article_slug,
            catch_phrase: art.article_catch_phrase_fr,
            long_desc: art.article_long_desc_fr,
            short_desc: art.article_short_desc_fr,
            assets: this.assets.filter(asset => {
              return asset.asset_place_fr == art.article_place_fr
            })
          }
          this.travel.articles.push(article)
        })
      }
      if (lang == 'it') {
        travel.name = travel.travel_name_it
        travel.description = travel.travel_desc_it
        travel.articles = []
        this.articles.forEach(art => {
          let article = {
            id: art.article_id,
            title: art.article_title_it,
            place: art.article_place_it,
            step: art.article_step,
            slug: art.article_slug,
            catch_phrase: art.article_catch_phrase_it,
            long_desc: art.article_long_desc_it,
            short_desc: art.article_short_desc_it,
            assets: this.assets.filter(asset => {
              return asset.asset_place_it == art.article_place_it
            })
          }
          travel.articles.push(article)
        })
      }
      return travel
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
