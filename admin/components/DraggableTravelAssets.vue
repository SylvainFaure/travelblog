<template>
  <div v-if="mounted" class="flex">
    <div class="assets-list w-1/3 p-4">
      <h3>{{ $t('assets.non_associated') }}</h3>
      <draggable
        :class="{ 'flex flex-wrap py-8': !!filteredAssets.length }"
        :list="filteredAssets"
        :group="{ name: 'assets', pull: true, put: true }"
        @change="handleAssetChange"
      >
        <div
          v-for="asset in filteredAssets"
          :key="`asset-${asset.asset_id}`"
          class="draggable-asset__container mr-2 mb-2"
        >
          <img :src="asset.asset_src" class="w-24" />
        </div>
      </draggable>
      <div v-if="!filteredAssets.length" class="my-4 text-xs">{{ $t('assets.non_associated_empty') }}</div>
    </div>
    <div class="travels-list w-2/3 bg-gray-200 p-4 h-3/4 overflow-y-scroll">
      <div v-for="travel in travels" :key="`travel-${travel.travel_id}`">
        <h3 :class="travel[`travel_title_${locale}`] ? '' : 'italic text-gray-500'">
          {{
            travel[`travel_title_${locale}`] ? travel[`travel_title_${locale}`] : travel[`travel_title_${otherLocale}`]
          }}
        </h3>
        <draggable
          :list="assetsByTravel[travel.travel_id]"
          :group="{ name: 'assets', pull: true, put: true }"
          :class="{ 'flex flex-wrap py-4': !!assetsByTravel[travel.travel_id].length }"
          @change="handleAssetChange($event, travel.travel_id)"
        >
          <div v-for="asset in assetsByTravel[travel.travel_id]" :key="`asset-travel-${asset.asset_id}`">
            <img :src="asset.asset_src" class="w-24 mr-2 mb-2" />
          </div>
        </draggable>
        <div v-if="!assetsByTravel[travel.travel_id].length" class="my-4 text-xs">{{ $t('assets.travel_empty') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  props: {
    assets: VueTypes.array.def([]),
    travels: VueTypes.array.def([]),
    articles: VueTypes.array.def([])
  },
  data() {
    const locale = this.$i18n.locale
    const otherLocale = locale === 'fr' ? 'it' : 'fr'
    return {
      locale,
      otherLocale,
      mounted: false,
      assetsByTravel: {},
      filteredAssets: [],
      modifiedAssetsIds: {}
    }
  },
  mounted() {
    this.locale = this.$i18n.locale
    this.travels.forEach((travel) => {
      this.$set(
        this.assetsByTravel,
        travel.travel_id,
        this.assets.filter((asset) => asset.asset_travel_id === travel.travel_id)
      )
    })
    this.filteredAssets = this.assets.filter((asset) => !asset.asset_travel_id)
    this.mounted = true
  },
  methods: {
    handleAssetChange(event, travelId) {
      if (event.added) {
        const asset = event.added.element
        // console.log(asset.asset_id, travelId)
        this.modifiedAssetsIds[asset.asset_id] = {
          past: asset.asset_travel_id,
          present: travelId
        }
        // console.log(this.modifiedAssetsIds)
      }
    },
    getModifiedAssets() {
      return this.modifiedAssetsIds
    }
  }
}
</script>
