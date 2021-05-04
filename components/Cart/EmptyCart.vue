<template>
  <div>
    <h1 class="mt-4 text-3xl text-center">Cart</h1>
    <!-- <div class="flex items-center justify-start mx-2">
      <nuxt-link to="/" class="absolute flex-1 font-bold text-left"
        ><ArrowLeftIcon  class="mr-1 text-gray-600 "
      /></nuxt-link>
      <h1 class="flex-1 p-2 text-xl font-semibold text-center bg-white">
        Cart
      </h1>
    </div>-->
    <div class="my-auto text-center">
      <div class="flex justify-center py-6">
        <img src="/empty-cart.gif" class="w-48 h-48 rounded-full" />
      </div>
      <div class="py-4 text-2xl">Your cart is empty</div>
      <div class="flex justify-center px-6 text-base text-center text-gray-500">
        Go ahead, order some essentials from the menu.
      </div>
      <nuxt-link
        to="/search/"
        class="inline-block px-6 py-2 my-3 rounded-full primary"
        >Go</nuxt-link
      >
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Heading } from '~/shared/components'
import { ArrowLeftIcon } from 'vue-feather-icons'
export default {
  components: { Heading, ArrowLeftIcon },
}
</script>
