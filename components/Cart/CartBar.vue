<template>
  <div
    v-if="cart.qty > 0"
    class="fixed bottom-0 z-10 flex justify-between w-full p-3 rounded-t-lg primary"
  >
    <div class="bounce">
      {{ cart.qty }} item |
      {{ tweenedNumber.toFixed(0) | currency(settings.currency_symbol) }}
    </div>
    <nuxt-link to="/cart" class="flex pl-2 border-l hover:opacity-75">
      <shopping-cart-icon />&nbsp; VIEW CART
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import gsap from 'gsap'
import { ShoppingCartIcon } from 'vue-feather-icons'
export default {
  data() {
    return {
      tweenedNumber: 0,
    }
  },
  components: { ShoppingCartIcon },
  computed: {
    ...mapGetters({ cart: 'cart/cart', settings: 'settings' }),
  },
  // watch: {
  //   'cart.subtotal': {
  //     immediate: true,
  //     handler(val) {
  //       let tl = gsap.timeline()
  //       tl.to('.bounce', { y: -10, duration: 0.5, ease: 'ease' })
  //       tl.to('.bounce', { y: 0, duration: 1, ease: 'bounce' })
  //       gsap.to(this.$data, {
  //         duration: 1,
  //         ease: 'circ.out',
  //         tweenedNumber: val,
  //       })
  //     },
  //     deep: true,
  //   },
  // },
}
</script>

<style scoped>
.primary {
  animation-name: zoom;
  animation-duration: 0.8s;
}
/* 

.primary {
  -webkit-animation: expand 1s;
}
@-webkit-keyframes expand {
  0% {
    height: 0px;
  }
  100% {
    height: 100px;
  }
} */
</style>
