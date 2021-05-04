<template>
  <div class="container flex flex-wrap justify-between p-2 mb-6">
    <nuxt-link to="/">
      <img alt="Litekart" class="h-10" v-lazy="`${settings.logo}`" />
    </nuxt-link>
    <div
      class="flex justify-between order-2 w-full pt-3 text-xs font-bold tracking-widest text-center text-gray-700 lg:order-1 lg:w-1/3"
    >
      <nuxt-link to="/cart">BAG</nuxt-link>
      <hr class="flex-1 mx-4 my-2" style="border-top: dashed 1px" />
      <nuxt-link
        to="/checkout/address"
        class="pb-1"
        :class="{
          'text-green-500 border-green-500 border-b-2': selected == 'address',
        }"
        >ADDRESS</nuxt-link
      >
      <hr class="flex-1 mx-4 my-2" style="border-top: dashed 1px" />
      <div
        :class="{
          'text-green-500 border-green-500 border-b-2': selected == 'payment',
        }"
      >
        PAYMENT
      </div>
    </div>
    <div class="flex items-center order-1 text-center lg:order-3">
      <svg
        class="w-8 text-green-500 transition-all ease-out"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M19 11a7.5 7.5 0 0 1-3.5 5.94L10 20l-5.5-3.06A7.5 7.5 0 0 1 1 11V3c3.38 0 6.5-1.12 9-3 2.5 1.89 5.62 3 9 3v8zm-9 1.08l2.92 2.04-1.03-3.41 2.84-2.15-3.56-.08L10 5.12 8.83 8.48l-3.56.08L8.1 10.7l-1.03 3.4L10 12.09z"
        />
      </svg>
      <span class="text-lg text-gray-500">100% secure</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['selected'],
  computed: {
    ...mapGetters({ settings: 'settings' }),
  },
}
</script>

<style scoped></style>
