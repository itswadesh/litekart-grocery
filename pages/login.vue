<template>
  <div>
    <!-- <Login /> -->
    <LoginEmail uid="user@litekart.in" password="litekart" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { location } from '~/shared/mixins'
import { Login, LoginEmail } from '~/shared/components'
export default {
  middleware: ['isGuest'],
  mixins: [location],
  components: { Login, LoginEmail },
  computed: {
    ...mapGetters({ settings: 'settings' }),
  },
  layout: 'none',
  head() {
    return {
      title: `Login to ${this.settings.websiteName}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Login to ${this.settings.websiteName}`,
        },
        {
          hid: 'og:description',
          name: 'Description',
          property: 'og:description',
          content: `Login to ${this.settings.websiteName}`,
        },

        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: 'Checkout with the products in your cart',
        },
        // Twitter
        {
          name: 'twitter:title',
          content: 'Checkout with the products in your cart',
        },
        {
          name: 'twitter:description',
          content: `Login to ${this.settings.websiteName}`,
        },
      ],
    }
  },
}
</script>
