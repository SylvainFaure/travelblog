<template>
  <section>
    <div class="m-6">
      <div class="flex my-4">
        <div class="w-1/2 flex flex-col items-center">
          <h4>{{ $t('assets.filter_by_travel') }}</h4>
          <div class="flex flex-wrap justify-center w-full">
            <Tag
              v-for="travel in data.travels"
              :key="travel.travel_id"
              class="mr-2 my-2"
              :tag="travel[`travel_title_${locale}`]"
              selectable
              :selected="filters.travel === travel.travel_id"
              @click="handleFilter(travel)"
            />
          </div>
        </div>
        <div class="w-1/2 flex flex-col items-center">
          <h4>{{ $t('assets.filter_by_place') }}</h4>
          <div class="flex flex-wrap justify-center w-full">
            <Tag
              v-for="place in places"
              :key="place.key"
              class="mr-2 my-2"
              :tag="place.label"
              selectable
              :selected="filters.place === place.label"
              @click="handleFilter(place)"
            />
          </div>
        </div>
      </div>

      <div class="flex flex-wrap justify-center">
        <div
          v-for="(asset, i) in filteredAssets"
          :id="`container_${asset.asset_id}`"
          :key="i"
          ref="assetContainer"
          :class="{
            'w-64 mr-4 my-2 relative': true,
            'h-72 border border-grey-100': !pick
          }"
        >
          <span v-if="pick === 'multiple'" class="absolute top-0 right-0">
            <input
              class="mr-2 mt-2 z-20"
              type="checkbox"
              :checked="pickedAssetsIds.includes(asset.asset_id)"
              @change="handleAssetPick(asset, $event)"
            />
          </span>
          <div
            :class="{ 'backdrop-container max-h-2/3 overflow-hidden relative flex justify-center items-center': !pick }"
          >
            <div
              v-if="!pick"
              class="backdrop opacity-0 absolute inset-0 h-full w-full hover:opacity-100 transition-opacity duration-300 bg-blue-100 bg-opacity-50"
            ></div>
            <div v-if="!pick" class="backdrop-content z-10 flex absolute inset-0 justify-center items-center opacity-0">
              <Btn icon-btn icon="pencil" @click="handleEdit(asset)" />
              <Btn icon-btn type="secondary" icon="bin" @click="handleRemove(asset)" />
            </div>
            <img
              :id="asset.asset_id"
              ref="asset"
              :class="{
                'max-h-2/3': !pick,
                'cursor-pointer': pick,
                'w-full overflow-hidden': true
              }"
              :src="asset.asset_src"
              @click="handleAssetPick(asset, $event)"
            />
          </div>
          <div v-if="!pick" class="asset__infos p-4">
            <p v-if="asset[`asset_title_${$i18n.locale}`]" class="font-bold text-lg">
              {{ asset[`asset_title_${$i18n.locale}`] }}
            </p>
            <p class="text-sm text-gray-600">
              {{ $t('assets.uploaded') }}
              {{ getUploadDate(asset[`asset_name`]) }}
            </p>
            <p v-if="asset[`asset_desc_${$i18n.locale}`]" class="text-sm text-gray-600">
              {{ $t('assets.description') }}
              {{ asset[`asset_desc_${$i18n.locale}`] }}
            </p>
          </div>
        </div>
        <div v-if="!filteredAssets.length" class="flex justify-center max-w-1/4 my-16">
          {{ $t('assets.filtered_empty') }}
        </div>
      </div>
      <RemoveModal v-if="modalId === 'asset-remove'" @confirm="removeAsset" @cancel="closeRemoveModal" />
      <EditAssetModal
        v-if="modalId === 'asset-edit'"
        :travels="data.travels"
        :articles="data.articles"
        :image="assetToEdit"
        @confirm="updateAsset"
        @cancel="closeRemoveModal"
      />
    </div>
  </section>
</template>

<script>
import { format } from 'date-fns'
import VueTypes from 'vue-types'
import { mapMutations, mapState } from 'vuex'
export default {
  props: {
    assets: VueTypes.array.def([]),
    pick: VueTypes.string.def(null),
    picked: VueTypes.oneOfType([VueTypes.array, VueTypes.object]).def(null),
    data: VueTypes.object.def({}),
    pickLimit: VueTypes.number.def(null)
  },
  data() {
    return {
      locale: '',
      pickedAsset: null,
      pickedAssetsIds: [],
      assetToRemove: null,
      assetToEdit: null,
      filters: {
        travel: null,
        place: null
      }
    }
  },
  computed: {
    ...mapState('modal', ['modalId']),
    places() {
      return this.data.articles
        .map((article) => {
          const value = article[`article_place_${this.locale}`]
          if (value) {
            return {
              key: value.toLowerCase().replaceAll(' ', '_'),
              label: value
            }
          }
        })
        .filter((obj) => !!obj)
    },
    filteredAssets() {
      return this.assets.filter((asset) => {
        if (this.filters.travel && this.filters.place) {
          return (
            this.filters.travel === Number(asset.asset_travel_id) &&
            !!asset[`asset_place_${this.locale}`] &&
            this.filters.place === asset[`asset_place_${this.locale}`]
          )
        } else if (this.filters.travel || this.filters.place) {
          return (
            this.filters.travel === Number(asset.asset_travel_id) ||
            this.filters.place === asset[`asset_place_${this.locale}`]
          )
        } else {
          return true
        }
      })
    }
  },
  mounted() {
    this.locale = this.$i18n.locale
    if (this.picked) {
      if (this.pick === 'multiple') {
        this.pickedAssetsIds = this.picked.map((p) => p.asset_id)
      } else {
        this.pickedAsset = this.picked
        this.$nextTick(() => {
          this.initWithPicked()
        })
      }
    }
  },
  methods: {
    ...mapMutations('modal', ['setVisible', 'setModalId']),
    getUploadDate(name) {
      const timestamp = name.split('_')[0]
      return format(new Date(Number(timestamp)), 'dd/MM/yyyy')
    },
    initWithPicked() {
      this.$refs.asset.forEach((a) => {
        if (Number(a.getAttribute('id')) !== Number(this.pickedAsset.asset_id)) {
          a.classList.add('opacity-50')
        } else {
          a.classList.remove('opacity-50')
        }
      })
    },
    handlePickOneAsset(asset) {
      this.$refs.asset.forEach((a) => {
        if (!this.pickedAsset || this.pickedAsset.asset_id !== asset.asset_id) {
          if (Number(a.getAttribute('id')) !== Number(asset.asset_id)) {
            a.classList.add('opacity-50')
          } else {
            a.classList.remove('opacity-50')
          }
        } else {
          a.classList.remove('opacity-50')
        }
      })
      this.pickedAsset = asset
    },
    handleAssetPick(asset, evt) {
      evt.stopPropagation()
      evt.preventDefault()
      if (this.pick === 'one') {
        this.handlePickOneAsset(asset)
        this.$emit('pick', asset)
      }
      if (this.pick === 'multiple') {
        if (
          !this.pickLimit ||
          this.pickedAssetsIds.length < this.pickLimit ||
          (this.pickedAssetsIds.length === this.pickLimit && !evt.target.checked)
        ) {
          let action
          if (evt.target.checked) {
            action = 'add'
            this.pickedAssetsIds.push(asset.asset_id)
          } else {
            action = 'remove'
            this.pickedAssetsIds = this.pickedAssetsIds.filter((a) => a !== asset.asset_id)
          }
          if (this.pickedAssetsIds.length === this.pickLimit) {
            this.$refs.assetContainer.forEach((a) => {
              if (!this.pickedAssetsIds.includes(Number(a.getAttribute('id').replace('container_', '')))) {
                a.classList.add('pointer-events-none')
                a.classList.add('opacity-50')
              }
            })
          } else {
            this.$refs.assetContainer.forEach((a) => {
              a.classList.remove('pointer-events-none')
              a.classList.remove('opacity-50')
            })
          }
          this.$emit('picks', this.pickedAssetsIds, asset, action)
        }
      }
    },
    handleEdit(asset) {
      this.assetToEdit = asset
      this.setVisible(true)
      this.setModalId('asset-edit')
    },
    handleRemove(asset) {
      this.assetToRemove = asset
      this.setVisible(true)
      this.setModalId('asset-remove')
    },
    async removeAsset() {
      try {
        await this.$axios.post('/api/assets/delete', {
          ids: [this.assetToRemove.asset_id],
          names: [this.assetToRemove.asset_name]
        })
        this.$toast.success(this.$t('assets.removed_success'))
        this.$emit('change')
      } catch (error) {
        console.log(error)
        this.$toast.error(this.$t('assets.removed_error'))
      } finally {
        this.closeRemoveModal()
        this.assetToRemove = null
      }
    },
    async updateAsset(asset, original) {
      const formatted = {
        ...original,
        [`asset_desc_${this.locale}`]: asset.description,
        [`asset_title_${this.locale}`]: asset.title,
        asset_article_ids: JSON.stringify(asset.article_ids.map((art) => Number(art.article_id))),
        asset_travel_id: Number(asset.travel.travel_id)
      }
      try {
        await this.$axios.put(`/api/assets/${original.asset_id}`, formatted)
        this.$toast.success(this.$t('assets.updated_success'))
        this.$emit('change')
        this.assetToEdit = null
      } catch (error) {
        console.log(error)
        this.$toast.error(this.$t('assets.updated_error'))
      }
    },
    closeRemoveModal() {
      this.setVisible(false)
      this.setModalId(null)
    },
    handleFilter(tag) {
      if (tag.travel_id) {
        this.filters.travel = this.filters.travel === tag.travel_id ? null : tag.travel_id
      } else {
        this.filters.place = this.filters.place === tag.label ? null : tag.label
      }
    }
  }
}
</script>
<style lang="scss">
.backdrop {
  transition: opacity 300ms;
  &-content {
    transition: opacity 300ms;
  }
  &-container:hover {
    & > .backdrop,
    & > .backdrop-content {
      opacity: 1;
    }
    & > .backdrop {
      filter: blur(5px) grayscale(0.7);
    }
  }
}
</style>
