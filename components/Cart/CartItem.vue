<template>
  <div class="flex justify-between w-full pt-5 pb-5 border-b border-gray-300">
    <div class="w-1/2 lg:w-1/3">
      <div>
        <img
          class="w-32 lg:rounded xs:rounded-b-none lg:w-48"
          v-lazy="item.img"
          alt=""
        />
      </div>
    </div>
    <div class="right-0 w-full lg:w-4/5">
      <div class="pl-4 font-hairline">
        <p class="mb-2 text-black">
          <nuxt-link :to="`/${item.slug}?id=${item.pid}`">{{
            item.name | truncate(30)
          }}</nuxt-link>
        </p>
        <div class="flex">
          <span style="color: rgb(237, 113, 0)" v-if="item.stock < 5"
            >{{ item.stock }} left</span
          >
        </div>
        <p class="relative mb-2">
          <span class="mb-2 text-2xl font-bold text-black">{{
            item.price | currency(settings.currency_symbol)
          }}</span>
          <span
            class="ml-2 text-xs text-gray-400 line-through lg:text-sm"
            v-if="calculateOffPercent(item.mrp, item.price) > 0"
            >{{ item.mrp | currency(settings.currency_symbol) }}</span
          >
          <span
            class="ml-2 text-xs text-green-400 lg:text-sm"
            v-if="calculateOffPercent(item.mrp, item.price) > 0"
            >{{ calculateOffPercent(item.mrp, item.price) }}% off</span
          >
        </p>
        <div class="justify-between text-sm">
          <div class="flex flex-wrap items-center justify-between mr-2">
            <div class="my-2">
              <CartButtons :product="{ id: item.pid, vid: item.vid }" />
            </div>
            <div class="flex my-2 text-xs">
              <button
                class="px-3 py-2 rounded muted"
                @click="
                  checkAndAddToCart({
                    pid: item.pid,
                    vid: item.pid,
                    qty: -10000,
                  })
                "
                :disabled="loading"
              >
                <img
                  src="/loading.svg"
                  class="w-3 h-3 rotateOutDownLeft"
                  v-if="loading"
                  alt=""
                />
                <Trash2Icon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
const CartButtons = () => import('./CartButtons')
import { Trash2Icon } from 'vue-feather-icons'

export default {
  props: {
    item: { type: Object },
  },
  data() {
    return {
      loading: false,
    }
  },
  components: { CartButtons, Trash2Icon },
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
  },
  methods: {
    ...mapActions({
      addToCart: 'cart/addToCart',
    }),
    async saveForLater(item) {
      this.checkAndAddToCart({
        pid: item.id,
        qty: -100000,
      })
      if (!(this.$store.state.auth || {}).user) {
        this.$router.push('/login?return=checkout')
        return
      } else {
        this.saveToWishlist(item)
      }
    },
    async saveToWishlist(item) {
      this.loading = true
      try {
        // let data = await this.$axios.$post('api/wishlists/add', item)
        this.$store.commit('success', 'Added to your wishlist')
        this.loading = false
      } catch (err) {
        this.loading = false
        this.$store.commit('setErr', err, { root: true })
      }
    },
    async checkAndAddToCart(item) {
      try {
        this.loading = true
        await this.addToCart(item)
        this.loading = false
      } catch (e) {
        console.log('err..', e.toString())
      }
    },
    calculateOffPercent(mrp, price) {
      let percent = ((mrp - price) * 100) / mrp
      return Math.round(percent)
    },
  },
}
</script>
