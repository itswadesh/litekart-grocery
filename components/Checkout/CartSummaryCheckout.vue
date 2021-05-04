<template>
  <div class="mt-4 mb-8 w-full">
    <div class="leading-relaxed bg-yellow-100 p-8 my-8 rounded border">
      <h3 class="font-semibold text-lg text-black">Price Details</h3>
      <div class="flex justify-between mt-1">
        <div class="w-1/2 text-sm text-left">Total item price</div>
        <div class="ml-2 w-1/2 text-black-400 text-right">
          {{ cart.subtotal | currency(settings.currency_symbol) }}
        </div>
      </div>
      <div class="flex justify-between mt-1" v-if="cart.discount.amount > 0">
        <div class="w-1/2 text-sm text-left">Item discount</div>
        <div class="ml-2 w-1/2 text-black-400 text-right">
          {{ cart.discount.amount | currency(settings.currency_symbol) }}
        </div>
      </div>
      <div class="flex justify-between mt-1" v-if="cart.shipping">
        <div class="w-1/2 text-sm text-left">Shipping fee</div>
        <div
          class="ml-2 w-1/2 text-black-400 text-right"
          v-if="cart.shipping.charge > 0"
        >
          {{ cart.shipping.charge | currency(settings.currency_symbol) }}
        </div>
        <div class="ml-2 w-1/2 text-black-400 text-right" v-else>FREE</div>
      </div>
      <div
        class="flex justify-between mt-1"
        v-if="cart.tax && cart.tax.cgst + cart.tax.sgst + cart.tax.igst > 0"
      >
        <div class="w-1/2 text-sm text-left">Tax (CGST + SGST)</div>
        <div class="ml-2 w-1/2 text-black-400 text-right text-xs">
          {{ cart.tax.cgst | currency(settings.currency_symbol, 2) }} +
          {{ cart.tax.sgst | currency(settings.currency_symbol, 2) }}
        </div>
      </div>
    </div>
    <div
      class="fixed left-0 bottom-0 lg:relative bg-white w-full px-4 lg:px-0 pb-2"
    >
      <div class="flex justify-between mt-2">
        <div class="text-lg font-bold text-left">Grand Total</div>
        <div class="font-bold text-black text-lg text-right">
          {{ cart.total | currency(settings.currency_symbol) }}
        </div>
      </div>
      <Button @click="proceed" color="primary">CONTINUE</Button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Button } from '~/shared/components/ui'
export default {
  props: {
    selectedAddress: { type: String },
  },
  computed: {
    ...mapGetters({ cart: 'cart/cart', settings: 'settings' }),
  },
  components: {
    Button,
  },
  methods: {
    proceed() {
      if (!this.selectedAddress) {
        this.$router.push(`/checkout/add`)
        return
      }
      this.$router.push(
        `/checkout/payment-mobile?address=${this.selectedAddress}`
      )
    },
  },
}
</script>

<style scoped></style>
