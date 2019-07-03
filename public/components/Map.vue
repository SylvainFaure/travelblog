<template>
  <div id="map" :class="{ 'map-country': steps.length, 'map-post': !steps.length }" />
</template>
<script>
import loadScript from '@/utils/loadScript'
export default {
  props: {
    address: {
      type: String,
      required: true
    },
    steps: {
      type: Array,
      default: () => []
    },
    zoom: {
      type: Number,
      default: 6
    }
  },
  async mounted() {
    if (!window.google) {
      try {
        await loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAOfPfOY1Xiv5nP5dke616CAtQbjLFsgR4&libraries=places')
        this.getCenter()
      } catch (e) {
        console.error('Error in loading google maps', e)
      }
    } else {
      this.getCenter()
    }
  },
  methods: {
    getCenter() {
      const address = this.address
      const _this = this
      if (!process.server) {
        const geocoder = new window.google.maps.Geocoder()
        geocoder.geocode(
          {
            address: address
          },
          function (results, status) {
            if (status === window.google.maps.GeocoderStatus.OK) {
              const center = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              }
              _this.initMap(center)
            }
          }
        )
      }
    },
    initMap(center) {
      const directionsService = new window.google.maps.DirectionsService()
      const directionsDisplay = new window.google.maps.DirectionsRenderer()
      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: this.zoom,
        center: center,
        disableDefaultUI: true,
        styles: [
          {
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#ebe3cd'
              }
            ]
          },
          {
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#523735'
              }
            ]
          },
          {
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'color': '#f5f1e6'
              }
            ]
          },
          {
            'featureType': 'administrative',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'color': '#c9b2a6'
              }
            ]
          },
          {
            'featureType': 'administrative.land_parcel',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'color': '#dcd2be'
              }
            ]
          },
          {
            'featureType': 'administrative.land_parcel',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#ae9e90'
              }
            ]
          },
          {
            'featureType': 'landscape.natural',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#dfd2ae'
              }
            ]
          },
          {
            'featureType': 'poi',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#dfd2ae'
              }
            ]
          },
          {
            'featureType': 'poi',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#93817c'
              }
            ]
          },
          {
            'featureType': 'poi.park',
            'elementType': 'geometry.fill',
            'stylers': [
              {
                'color': '#a5b076'
              }
            ]
          },
          {
            'featureType': 'poi.park',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#447530'
              }
            ]
          },
          {
            'featureType': 'road',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#f5f1e6'
              }
            ]
          },
          {
            'featureType': 'road.arterial',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#fdfcf8'
              }
            ]
          },
          {
            'featureType': 'road.highway',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#f8c967'
              }
            ]
          },
          {
            'featureType': 'road.highway',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'color': '#e9bc62'
              }
            ]
          },
          {
            'featureType': 'road.highway.controlled_access',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#e98d58'
              }
            ]
          },
          {
            'featureType': 'road.highway.controlled_access',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'color': '#db8555'
              }
            ]
          },
          {
            'featureType': 'road.local',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#806b63'
              }
            ]
          },
          {
            'featureType': 'transit.line',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#dfd2ae'
              }
            ]
          },
          {
            'featureType': 'transit.line',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#8f7d77'
              }
            ]
          },
          {
            'featureType': 'transit.line',
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'color': '#ebe3cd'
              }
            ]
          },
          {
            'featureType': 'transit.station',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#dfd2ae'
              }
            ]
          },
          {
            'featureType': 'water',
            'elementType': 'geometry.fill',
            'stylers': [
              {
                'color': '#b9d3c2'
              }
            ]
          },
          {
            'featureType': 'water',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#92998d'
              }
            ]
          }
        ]
      })
      directionsDisplay.setMap(map)
      if (this.steps.length > 1) {
        this.initDirections(directionsService, directionsDisplay, this.steps)
      }
    },
    initDirections(directionsService, directionsDisplay, steps) {
      const waypoints = []
      for (let i = 1; i < steps.length - 1; i++) {
        waypoints.push({
          location: steps[i],
          stopover: true
        })
      }
      directionsService.route(
        {
          origin: steps[0],
          destination: steps[steps.length - 1],
          waypoints: waypoints,
          optimizeWaypoints: true,
          travelMode: 'DRIVING'
        },
        function (response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response)
          } else {
            console.debug('Directions request failed due to ' + status)
          }
        }
      )
    }
  }
}
</script>

<style lang="scss">
.map-country {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 550px;
}
.map-post {
  width: 100%;
  height: 450px;
}
</style>
