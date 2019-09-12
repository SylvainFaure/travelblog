<template>
  <div v-if="wants">
    DISCOGS TEST
    <div
      v-for="item in wants"
      :key="item.id"
      class="item"
    >
      <div>
        <img class="item__img" :src="item.basic_information.cover_image" alt="">
      </div>
      <div class="item__infos">
        {{ item.basic_information.title }} - {{ item.basic_information.artists[0].name }}
        <div class="item__btn">
          <a :href="item.link" target="_blank">
            Go
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import uniqBy from 'lodash.uniqby'
const API = 'https://api.discogs.com'
const endpoint = 'users/nolandskid/wants'
const token = 'BHFNhZnWkEohZOdQKaYDRarGinvdGyGMFVYPPyHo'

export default {
  asyncData() {
    let res
    return axios.get(`${API}/${endpoint}`, { headers: {
      Authorization: `Discogs token=${token}`
    } })
      .then(response => {
        res = response.data
        const _wants = res.wants.map(el => {
          el.basic_information.title = el.basic_information.title.trim()
          el.link = `https://www.discogs.com/fr/sell/release/${el.basic_information.id}?ev=rb`
          return el
        })
        const w = uniqBy(_wants, 'basic_information.title')
        console.log('e', w)
        return {
          wants: w,
          pagination: res.pagination
        }
      })
      .catch(err => {
        console.log(err)
        return err
      })
  }
}
</script>
<style lang="scss">
.item {
  display: flex;
  flex-direction: row;
  margin: 1em;
  &__img {
    width: 6em;
    margin-right: 1em;
  }
  &__infos {
    display: flex;
    flex-direction: column;
  }
  &__btn {
    margin-top: 2em;
    text-align: center;
    width: 5em;
    padding: 2px;
    border: 1px solid black;
  }
}
</style>
