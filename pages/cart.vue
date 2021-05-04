<template>
  <div class="container mx-auto">
    <EmptyCart v-if="!cart || !cart.qty || cart.qty == 0" />
    <div class="flex flex-wrap justify-between lg:mt-10" v-else>
      <div class="w-full lg:w-2/3 lg:pr-20">
        <div class="justify-between w-full pb-2 hr-line">
          <div
            class="hidden w-full text-lg font-bold bg-white lg:block headings"
          >
            <div class="flex flex-wrap">
              <div class="w-1/2 text-left">
                My Shopping Bag ({{ cart.qty }} Items)
              </div>
              <div class="w-1/2 text-right">
                Total {{ cart.total | currency(settings.currency_symbol) }}
              </div>
            </div>
          </div>

          <div class="flex flex-wrap w-full p-3 mt-3 bg-white lg:hidden">
            <div
              class="w-20 text-3xl font-bold text-left border-r border-gray-200 headings"
            >
              Cart
            </div>
            <span class="mx-4 text-sm text-gray-500">
              {{ cart.qty }} items
              <br />
              Total {{ cart.total | currency(settings.currency_symbol) }}
            </span>
          </div>
        </div>
        <CartItem v-for="(item, ix) in cart.items" :key="ix" :item="item" />
        <!-- <CartBanners /> -->
      </div>
      <CartSummary :cart="cart" class="w-full lg:w-1/3">
        <Button @click="$router.push('/checkout/address')" color="primary"
          >SELECT ADDRESS
        </Button>
      </CartSummary>
    </div>
  </div>
</template>

<script>
import StickyFooter from '~/components/StickyFooter'
import EmptyCart from '~/components/Cart/EmptyCart'
import CartSummary from '~/components/Cart/CartSummary'
import CartBanners from '~/components/Cart/CartBanners'
import CartItem from '~/components/Cart/CartItem'
import { Button, BackButton } from '~/shared/components/ui'
import { mapGetters, mapActions } from 'vuex'
// import gsap from 'gsap'

export default {
  data() {
    return {
      tweenedNumber: 0,
    }
  },
  created() {
    this.fetchCart()
  },
  // watch: {
  //   'cart.total': {
  //     immediate: true,
  // handler(val) {
  //   gsap.to(this.$data, {
  //     duration: 1,
  //     ease: 'circ.out',
  //     tweenedNumber: val,
  //   })
  // },
  //   deep: true,
  // },
  // },
  computed: {
    ...mapGetters({
      settings: 'settings',
      user: 'auth/user',
      cart: 'cart/cart',
      showCart: 'cart/showCart',
    }),
  },
  methods: {
    ...mapActions({
      fetchCart: 'cart/fetch',
      applyCoupon: 'cart/applyCoupon',
      removeCoupon: 'cart/removeCoupon',
    }),
    go(url) {
      this.$router.go(-1)
    },
  },
  components: {
    EmptyCart,
    CartSummary,
    CartBanners,
    CartItem,
    Button,
    StickyFooter,
    BackButton,
  },
}
</script>
