<template>
  <portal to="modal">
    <div class="p-8">
      <input-text id="pac-input" type="text" placeholder="Lieu - Luogo" />
      <div id="map"></div>
      <div id="infowindow-content">
        <img id="place-icon" src="" width="16" height="16" />
        <span id="place-name" class="title"></span><br />
        <span id="place-address"></span>
      </div>
      <div class="flex justify-end my-4">
        <Btn :label="$t('general.confirm')" additional-classes="confirm-map-point" />
      </div>
    </div>
  </portal>
</template>

<script>
export default {}
</script>
<style>
#map {
  height: 100%;
  min-height: 400px;
}
#infowindow-content .title {
  font-weight: bold;
}

#infowindow-content {
  display: none;
}

#map #infowindow-content {
  display: inline;
}
</style>
