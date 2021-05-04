<template>
  <ApolloQuery
    :query="require('~/gql/product/bestSellers.gql')"
    :update="(data) => data.bestSellers"
    fetchPolicy="no-cache"
  >
    <template v-slot="{ result: { error, data }, isLoading }">
      <div v-if="isLoading" class="flex">
        <Product class="w-1/2" v-for="(n, ix) in 2" :key="ix" :p="{}" />
      </div>
      <div v-else-if="error">
        <ErrComponent />
      </div>
      <div v-else-if="data">
        <div class v-if="data.t && data.t.length > 0">
          <Carousel
            :products="data.t"
            :title="`Best Sellers on ${data.t[0]._id.date}`"
          />
        </div>
        <div class="mt-4" v-if="data.t1 && data.t1.length > 0">
          <Carousel
            :products="data.t1"
            :title="`Best Sellers on ${data.t1[0]._id.date}`"
          />
        </div>
        <div class="mt-4" v-if="data.t2 && data.t2.length > 0">
          <Carousel
            :products="data.t2"
            :title="`Best Sellers on ${data.t2[0]._id.date}`"
          />
        </div>
        <div class="mt-4" v-if="data.t3 && data.t3.length > 0">
          <Carousel
            :products="data.t3"
            :title="`Best Sellers on ${data.t3[0]._id.date}`"
          />
        </div>
        <div class="mt-4" v-if="data.t4 && data.t4.length > 0">
          <Carousel
            :products="data.t4"
            :title="`Best Sellers on ${data.t4[0]._id.date}`"
          />
        </div>
      </div>
    </template>
  </ApolloQuery>
</template>

<script>
import Vue from 'vue'
import Carousel from './CarouselBestSeller'
import bestSellers from '~/gql/product/bestSellers.gql'
import FoodItem from './FoodItem.vue'
import { Product } from '~/shared/components'

export default {
  // data() {
  //   return { bestSellers: null }
  // },
  // async created() {
  //   try {
  //     this.$store.commit('clearErr')
  //     this.bestSellers = (
  //       await this.$apollo.query({
  //         query: bestSellers
  //         // fetchPolicy: 'no-cache'
  //       })
  //     ).data.bestSellers
  //   } catch (e) {
  //     this.$store.commit('setErr', e)
  //   } finally {
  //     this.$store.commit('busy', false)
  //   }
  // },
  components: { Carousel, FoodItem, Product },
}
</script>

<style scoped></style>
