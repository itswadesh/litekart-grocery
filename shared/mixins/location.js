import { mapGetters } from 'vuex'
import getLocation from '~/gql/location/getLocation.gql'
export default {
  computed: { ...mapGetters({ settings: 'settings' }) },
  mounted() {
    // let recaptchaScript = document.createElement('script')
    // recaptchaScript.setAttribute(
    //   'src',
    //   'https://maps.googleapis.com/maps/api/js?key=' + GOOGLE_MAPS_KEY
    // )
    // document.head.appendChild(recaptchaScript)
  },
  methods: {
    drawBoundries() {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 18.8561, lng: 82.7347 },
        zoom: 12,
      })

      var triangleCoords = [
        { lat: 18.849335, lng: 82.734222 },
        { lat: 18.827176, lng: 82.975917 },
        { lat: 18.357822, lng: 82.724857 },
        { lat: 18.456663, lng: 82.964658 },
        { lat: 18.795072, lng: 82.228701 },
        { lat: 19.100792, lng: 82.267496 },
      ]
      var point = new google.maps.LatLng(18.8561, 82.7347)
      var bermudaTriangle = new google.maps.Polygon({ paths: triangleCoords })

      google.maps.event.addListener(map, 'click', function (e) {
        console.log(e)
        var resultColor = google.maps.geometry.poly.containsLocation(
          point,
          bermudaTriangle
        )
        console.log(resultColor)
      })
    },
    pinLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.showPosition,
          this.showError
        )
      } else {
        this.$store.commit(
          'setErr',
          'Geolocation is not supported by this browser.'
        )
      }
    },
    showPosition(pos) {
      var position = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      }
      // var position = new google.maps.LatLng(18.732081, 82.830031);
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: position,
      })
      var marker = new google.maps.Marker({ position, map })
    },
    async getLocation() {
      return new Promise((resolve, reject) => {
        if (!('geolocation' in navigator)) {
          reject(new Error('Geolocation is not available.'))
        }

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            resolve(pos)
          },
          (err) => {
            reject(err)
          }
        )
      })
    },
    async locateMe(l) {
      if (l) {
        // let location = l.coords
        // const location = (await this.getLocation()).coords; // Location accuracy is too bad shows Anugul
        this.$store.commit('clearErr')
        let g = (
          await this.$apollo.query({
            query: getLocation,
            variables: { lat: l.lat, lng: l.lng },
            fetchPolicy: 'no-cache',
          })
        ).data.getLocation
        const geo = {
          district: g.district,
          city: g.city,
          state: g.state,
          zip: g.zip,
          coords: { lat: l.lat, lng: l.lng },
        }
        console.log('Geo...', geo)
        this.$cookies.set('geo', geo, {
          path: '/',
          maxAge: this.settings.locationExpiry,
        })
        return geo
      } else return {}
    },
    showInMap(pos) {
      const position = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      }
      // var position = new google.maps.LatLng(18.732081, 82.830031);
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: position,
      })
      var marker = new google.maps.Marker({ position, map })
    },
    getLiveLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition)
      } else {
        console.log('Geolocation is not supported by this browser.')
      }
    },
    showError(error) {
      let err = null
      switch (error.code) {
        case error.PERMISSION_DENIED:
          err = 'User denied the request for Geolocation.'
          break
        case error.POSITION_UNAVAILABLE:
          err = 'Location information is unavailable.'
          break
        case error.TIMEOUT:
          err = 'The request to get user location timed out.'
          break
        case error.UNKNOWN_ERROR:
          err = 'An unknown error occurred.'
          break
      }
      this.$store.commit('setErr', err)
    },
  },
}
