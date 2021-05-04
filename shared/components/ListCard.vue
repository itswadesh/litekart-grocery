<template>
  <div>
    <!-- <div class="flex justify-between px-2 py-4 bg-white">
      <input
        type="text"
        class="w-full text-xl border rounded-full"
        name="search"
      />
      <img
        src="img/banners.svg"
        class="w-8 h-8 ml-2 bg-gray-300 rounded-full"
      />
    </div>
    <div class="flex justify-between">
      <h1 class="px-2 font-bold">Popular of the week</h1>
      <h2 class="px-2 text-sm font-medium">Show all (>)</h2>
    </div>-->
    <div class="flex px-1 py-1 m-2 bg-white rounded shadow">
      <div v-if="p.badge">
        <div class="pink badge" v-if="p.badge.trending">Trending</div>
        <div class="blue badge" v-else-if="p.badge.hot">Hot</div>
        <div class="green badge" v-else-if="p.badge.sale">Sale</div>
        <div class="orange badge" v-else-if="p.badge.featured">
          featured
        </div>
        <div class="yellow badge" v-else-if="p.badge.recommended">
          recommended
        </div>
      </div>
      <nuxt-link :to="`/${p.slug}`" class="p-2">
        <img v-lazy="p.img" class="object-cover w-32 h-20 rounded" />
      </nuxt-link>
      <div class="relative w-full my-1">
        <!-- <img
          v-lazy="`/${p.vendor.img}`"
          class="absolute top-0 right-0 object-contain w-4 h-4"
        /> -->
        <nuxt-link :to="`/${p.slug}`" class="font-bold tracking-wide">
          {{ p.name }}
        </nuxt-link>
        <div class="flex justify-between">
          <div class="text-xl font-black text-gray-700">
            {{ p.price | currency(settings.currency_symbol) }}
          </div>
          <CartButtons v-if="p.stock > 0" :product="{ id: p.id }" />
        </div>
        <div class="flex items-center justify-between">
          <div
            v-if="p.stock < 1"
            class="px-3 text-xs text-white bg-orange-500 rounded-full"
          >
            Sold out
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Ratingcircle } from './ui'
import { CartButtons } from './../components'

export default {
  props: ['p', 'isLoading'],
  methods: {},
  components: { Ratingcircle, CartButtons },
  computed: { ...mapGetters({ settings: 'settings' }) },
}
</script>

<style scoped></style>
