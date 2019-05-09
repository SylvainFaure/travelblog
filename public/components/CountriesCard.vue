<template>
  <div class="countries">
    <div
      v-for="travel in travels"
      :key="travel.travel_id"
      class="countries__card"
    >
      <div
        class="countries__card-header"
        :style="travelCover(travel)"
      >
        <h2 class="countries__card-header-title">
          {{ travel.travel_name }}
        </h2>
      </div>
      <div class="countries__card-content">
        <div class="countries__card-content-header">
          {{ travel.travel_countries }}
        </div>
        <div class="countries__card-content-main">
          {{ travel.travel_desc }}
        </div>
      </div>
      <div class="countries__card-footer">
        <nuxt-link :to="{path: '/travel', params: { travel: travel.travel_name }}">
          <a @click="goToTravel(travel)">
            <button class="cta cta-home"> {{ label_discover }} </button>
          </a>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data() {
    /* const imgPath =
      process.env.NODE_ENV !== 'development'
        ? process.env.AWS_BUCKET_PATH
        : '/assets/thumb/mini_' */
    return {
      baseUrl: process.env.BASE_URL,
      imgUrl: process.env.AWS_BUCKET_PATH, // imgPath,
      label_discover: 'Découvrez'
    }
  },
  computed: {
    ...mapState(['travels'])
  },
  methods: {
    travelCover(travel) {
      return `background: url('${this.imgUrl}img/${
        travel.travel_cover
      }');background-repeat: no-repeat; background-position: center; background-size: cover;`
    }
  }
}
</script>

<style lang="scss">
.countries {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;
  width: 100%;

  &__card {
    display: flex;
    flex-direction: column;
    height: 450px;
    width: 28%;
    min-width: 300px;

    background-color: rgba(255, 255, 255, 0.2);
    margin: 2em;
    border: 1px solid;
    border-color: rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 0.5em;
    border-bottom-left-radius: 0.5em;

    &-header {
      height: 45%;
      background: black;
      font-size: 30px;
      vertical-align: middle;
      font-family: 'IM Fell DW Pica', serif;

      &-title {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        margin: 0;
        color: white;
        vertical-align: middle;
      }
    }

    &-content {
      padding: 1em;
      height: 50%;
      &-header {
        padding: 0.5em 0;
        font-weight: 700;
      }
      &-main {
        line-height: 1.2;
        font-size: 1.1em;
      }
    }

    &-footer {
      padding: 1em;
    }
  }
}
</style>
