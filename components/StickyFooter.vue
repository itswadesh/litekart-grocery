<template>
  <div>
    <div class="justify-center hidden md:flex bg-gray-200">
      <GeoLocation />
    </div>
    <div
      class="md:hidden shadow-lg w-full bg-gray-100 border-t overflow-x-auto fixed bottom-0 z-10 text-gray-800 mt-20"
    >
      <div class="flex justify-around items-center">
        <nuxt-link
          to="/search/"
          class="category-item"
          exact-active-class="text-primary"
        >
          <HomeIcon />
          <span class="text-xs">Explore</span>
        </nuxt-link>
        <nuxt-link to="/my/" class="category-item" active-class="text-primary">
          <svg
            class="h-6 w-6 transition-all ease-out"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
            />
          </svg>
          <span class="text-xs">Account</span>
        </nuxt-link>
        <nuxt-link
          to="/offers"
          class="category-item"
          active-class="text-primary"
        >
          <svg
            class="h-6 w-6 transition-all ease-out"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M7.7 6.3L9 7.58l4.3-4.3a1 1 0 0 1 1.4 1.42L10.42 9l4.3 4.3a1 1 0 0 1-1.42 1.4L9 10.42l-1.3 1.3a3 3 0 1 1-1.4-1.42L7.58 9l-1.3-1.3a3 3 0 1 1 1.42-1.4zM21 8a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0 1 1 0 0 1 0-2h1zM4 20a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 2 0zm17 2h-1a1 1 0 0 1 0-2 1 1 0 0 1 2 0v1a1 1 0 0 1-1 1zM14 8h2a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2zm7 5a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm-7 7h2a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2zm-6 0h2a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zm-2.3-6.3a1 1 0 1 0-1.4-1.4 1 1 0 0 0 1.4 1.4zM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
            />
          </svg>
          <span class="text-xs">Offers</span>
        </nuxt-link>
        <nuxt-link
          to="/cart"
          class="category-item relative"
          active-class="text-primary"
        >
          <span
            class="absolute flex justify-center items-center inline-block w-6 h-6 text-sm rounded-full text-red-600 bg-yellow-400 -mt-4 ml-5 text-center font-bold"
            >{{ cart.qty }}</span
          >
          <svg
            class="h-6 w-6 transition-all ease-out"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M17 16a3 3 0 1 1-2.83 2H9.83a3 3 0 1 1-5.62-.1A3 3 0 0 1 5 12V4H3a1 1 0 1 1 0-2h3a1 1 0 0 1 1 1v1h14a1 1 0 0 1 .9 1.45l-4 8a1 1 0 0 1-.9.55H5a1 1 0 0 0 0 2h12zM7 12h9.38l3-6H7v6zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
            />
          </svg>
          <span class="text-xs">Cart</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { HomeIcon } from 'vue-feather-icons'
import { mapGetters } from 'vuex'
import { GeoLocation } from '~/shared/components/'
export default {
  computed: {
    ...mapGetters({ cart: 'cart/cart' }),
  },
  components: { HomeIcon, GeoLocation },
}
</script>
