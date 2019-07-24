<template>
  <div class="countries">
    <div
      v-for="(travel, i) in _travels"
      :key="travel.travel_id"
      class="countries__card"
      :class="isSimpleClass(i)"
    >
      <div
        class="countries__card-header"
        :style="travelCover(travel)"
      >
        <h2 class="countries__card-header-title">
          {{ travel.name }}
        </h2>
      </div>
      <div class="countries__card-content">
        <div class="countries__card-content-header">
          {{ travel.countries }}
        </div>
        <div class="countries__card-content-main">
          {{ travel.description }}
        </div>
      </div>
      <div class="countries__card-footer">
        <btn :link="{name: `travel-travelSlug`, params: { travelSlug: travel.travel_slug, travelId: travel.travel_id }}">
          {{ $t('label_discover') }}
        </btn>
      </div>
    </div>
  </div>
</template>
<script>
import formatTravel from '@/mixins/formatTravel'
import formatRoute from '@/mixins/formatRoute'
import { mapState } from 'vuex'
import Btn from '@/components/Btn'

export default {
  components: {
    Btn
  },
  mixins: [formatTravel, formatRoute],
  data() {
    /* const imgPath =
      process.env.NODE_ENV !== 'development'
        ? process.env.AWS_BUCKET_PATH
        : '/assets/thumb/mini_' */
    return {
      baseUrl: process.env.BASE_URL,
      imgUrl: process.env.AWS_BUCKET_PATH // imgPath,
    }
  },
  computed: {
    ...mapState(['travels']),
    _travels() {
      return this.travels.map(travel => this.formatTravel(travel))
    }
  },
  methods: {
    travelCover(travel) {
      return `background: url('${this.imgUrl}img/${
        travel.travel_cover
      }');background-repeat: no-repeat; background-position: center; background-size: cover;`
    },
    isSimpleClass(i) {
      const simple = [1, 2, 5, 6, 9, 10]
      return simple.includes(i) ? 'simple' : ''
    }
  }
}
</script>

<style lang="scss">
.countries {
  @include flex(row, flex-start, flex-start);
  flex-wrap: wrap;
  text-align: center;
  width: 100%;

  &__card {
    display: flex;
    flex-direction: column;
    width: 50%;

    &.simple {
      width: 30%;
    }

    background-color: rgba(255, 255, 255, 0.2);
    margin: 2em;
    border: 1px solid;
    border-color: rgba(0, 0, 0, 0.2);
    &-header {
      @include flex(row, center, center);
      height: 45%;
      min-height: 6em;
      background: black;
      font-size: 2em;

      &-title {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        margin: 0;
        background: -webkit-linear-gradient(top, rgba(255,255,255, 0.8), rgba(240,240,240, 0.4));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
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
