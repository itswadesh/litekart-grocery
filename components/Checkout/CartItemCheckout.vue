<template>
  <div class="flex justify-between rounded shadow hr-line">
    <div class="left-0 h-32 lg:w-1/5 xs:w-3/12">
      <nuxt-link :to="`/${item.product.slug}?id=${item.product._id}`">
        <img class="object-cover h-40" v-lazy="item.product.img" alt />
        <div
          class="p-2 text-black bg-gray-300 rounded rounded-t-none lg:hidden xs:visible"
        >
          Arrives 19 Sep
        </div>
      </nuxt-link>
    </div>
    <div class="right-0 lg:w-4/5 xs:9/12">
      <div class="pl-4 font-hairline">
        <div class="flex flex-wrap w-full p-2">
          <div class="w-3/4">
            <a href="#" class="text-lg text-black">{{ item.product.name }}</a>
            <div class="text-xs font-hairline text-gray-700">
              Sold By: {{ item.product.brand }}
            </div>
          </div>
          <div class="w-1/4 text-right">
            <div class="mb-2 text-sm font-bold text-black">
              {{ item.variant.price | currency(settings.currency_symbol) }}
            </div>
            <div class="mb-2 text-xs text-gray-500">
              <span class="line-through">
                {{ item.variant.mrp | currency(settings.currency_symbol) }}
              </span>
              <span class>|</span>
              <span class="font-hairline text-orange-500">
                {{ calculateOffPercent(item.variant.mrp, item.variant.price) }}%
                OFF
              </span>
            </div>
          </div>
        </div>
        <div class>
          <div class="w-full p-2 text-hairline">
            <div class="relative inline-block">
              Size: {{ item.variant.size }}
            </div>

            <div class="flex justify-between">
              <CartButtons
                :product="{ _id: item.product._id }"
                :variant="{ _id: item.variant.id }"
              />
              <div>
                <button class="p-4 focus:outline-none">MOVE TO WISHLIST</button>
                <button
                  class="right-0 px-3 py-1 text-2xl font-medium text-gray-600 bg-gray-200 rounded"
                  @click="
                    checkAndAddToCart({
                      pid: item.product.id,
                      vid: item.variant.id,
                      qty: -10000,
                    })
                  "
                  :disabled="loading"
                >
                  <img src="/loading.svg" v-if="loading" alt="..." />
                  <svg
                    v-else
                    class="transition-all ease-out"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="w-full p-2 text-gray-500 border-t border-gray-300"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
const CartButtons = () => import('~/components/Cart/CartButtons')

export default {
  props: { item: { type: Object } },
  data() {
    return {
      loading: false,
    }
  },
  components: { CartButtons },
  methods: {
    ...mapActions({
      addToCart: 'cart/addToCart',
    }),
    async checkAndAddToCart(item) {
      try {
        this.loading = true
        await this.addToCart(item)
        this.loading = false
      } catch (e) {
        console.log('err...', e.toString())
      }
    },
    calculateOffPercent(mrp, price) {
      let percent = ((mrp - price) * 100) / mrp
      return Math.round(percent)
    },
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
      user: 'auth/user',
      cart: 'cart/cart',
      showCart: 'cart/showCart',
    }),
  },
  methods: {
    calculateOffPercent(mrp, price) {
      let percent = ((mrp - price) * 100) / mrp
      return Math.round(percent)
    },
  },
}
</script>

<style scoped></style>
