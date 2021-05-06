<template>
  <header class="fixed z-20 w-full bg-white shadow-lg opacity-75 blur">
    <nav class="container flex flex-wrap items-center justify-between mx-auto">
      <div
        class="flex flex-wrap items-center flex-shrink-0 order-1 text-orange"
      >
        <nuxt-link to="/">
          <img class="h-6 mx-2" v-lazy="`${settings.logo}`" alt="Home" />
        </nuxt-link>
      </div>
      <div class="order-4 w-full px-2 md:w-1/2 md:mb-0 md:pr-6 md:order-3">
        <Search class="pb-2 md:pb-0" />
      </div>
      <div class="order-3 py-3 ml-10 mr-3 md:order-4 headings">
        <div v-if="geo" class="flex text-sm md:hidden">
          <div v-if="errorStr">
            Sorry, but the following error occurred: {{ errorStr }}
          </div>
          <div v-if="gettingLocation">
            <i>Getting your location...</i>
          </div>
          <nuxt-link
            to="/change-location"
            class="flex items-center pl-2 rounded"
          >
            {{ geo.city }}
            <ChevronRightIcon />
          </nuxt-link>
        </div>
        <div class="items-center justify-between flex-shrink-0 hidden md:flex">
          <nuxt-link
            class="flex flex-col items-center mx-4"
            :to="!user ? '/login' : '/my'"
          >
            <SmileIcon class="h-5" />
            <div class="text-xs font-bold headings">Profile</div>
          </nuxt-link>
          <!-- <nuxt-link class="flex flex-col items-center mx-3" to="/wishlist">
            <HeartIcon class="h-5 center" />
            <div class="text-xs font-bold headings">Wishlist</div>
          </nuxt-link>-->
          <nuxt-link
            class="relative flex flex-col items-center mx-3"
            to="/cart"
          >
            <ShoppingCartIcon class="h-5" />
            <div class="flex text-xs font-bold">
              Cart
              <div
                class="absolute flex items-center justify-center px-1 font-bold text-center rounded-full primary desktop-badge"
                style="padding-top: 2px"
                v-if="cart.qty > 0"
              >
                {{ cart.qty }}
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import { Error, Search } from '~/shared/components'
import { location } from '~/shared/mixins'
import {
  ChevronRightIcon,
  HeartIcon,
  ShoppingCartIcon,
  SmileIcon,
} from 'vue-feather-icons'
export default {
  components: {
    ChevronRightIcon,
    HeartIcon,
    ShoppingCartIcon,
    SmileIcon,
    Search,
  },

  data() {
    return {
      cls: '',
      errorStr: null,
      geo: null,
      gettingLocation: false,
    }
  },
  methods: {
    submit(q) {
      this.$router.push(`/search/${q}`)
    },
  },
  mixins: [location],
  async mounted() {
    if (process.client) {
      window.addEventListener('scroll', () => {
        let scrolled = window.scrollY
        this.cls = scrolled > 147 ? 'fix-search' : ''
      })
    }
    try {
      this.geo = this.$cookies.get('geo')
      if (!this.geo && process.client) {
        this.$router.push('/change-location')
      }
    } catch (e) {
      this.errorStr = e
    } finally {
      this.gettingLocation = false
    }
  },

  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null
    },
    cart() {
      return this.$store.state.cart || {}
    },
    ...mapGetters({
      showCart: 'cart/showCart',
      settings: 'settings',
    }),
  },
  methods: {
    closeSidebar() {
      this.sidebar = false
    },
    logout() {
      this.$store.dispatch('auth/logout').then(() => {})
    },
    go(url) {
      this.$router.push(url)
    },
  },
}
</script>

<style scoped>
.blur {
  backdrop-filter: saturate(180%) blur(5px);
}
.desktop-badge {
  font-size: 8px;
  right: -6px;
  top: -6px;
  height: 15px;
  width: 14px;
  border-radius: 50%;
  display: inline-block;
}
.desktop-badge .number {
  margin-top: 1.5px;
  margin-left: -1px;
}

.fix-search {
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  padding: 10px;
  z-index: 100;
  margin: 0px;
}
</style>
