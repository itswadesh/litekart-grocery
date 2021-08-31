<template>
  <div v-if="$fetchState.pending" class="flex">
    <Product class="w-1/2" v-for="(n, ix) in 2" :key="ix" :p="{}" />
  </div>
  <ErrComponent v-else-if="$fetchState.error" :error="error" />
  <div v-else-if="data && data.length">
    <Carousel :products="data" title="Popular" />
  </div>
  <div v-else>No popular products</div>
</template>

<script>
import { Product } from '~/shared/components'
import Carousel from './Carousel2'

export default {
  data() {
    return {
      data: null,
    }
  },
  async fetch() {
    this.getPopular()
  },
  methods: {
    async getPopular() {
      this.data = await this.$get('product/popular')
    },
  },
  fetchOnServer: false,
  components: {
    Carousel,
    Product,
  },
}
</script>

<style scoped></style>
