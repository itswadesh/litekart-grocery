<template>
  <ApolloQuery
    :query="require('~/gql/product/bestSellers.gql')"
    :variables="{ store: $store.state.store && $store.state.store.id }"
  >
    <template v-slot="{ result: { error, data }, isLoading }">
      <div v-if="isLoading">Loading........</div>

      <ErrComponent v-else-if="error" :error="error" />

      <div v-else-if="data && data.bestSellers.length > 0">
        <Carousel2 :products="products" title="Best Sellers" />
      </div>
    </template>
  </ApolloQuery>
</template>

<script>
// import Vue from 'vue'
import Carousel from './Carousel.vue'
import Carousel2 from './Carousel2.vue'
import bestSellers from '~/gql/product/bestSellers.gql'
// import { ErrComponent } from '~/shared/components/ui'

export default {
  // data() {
  //   return { products: [] }
  // },
  // async created() {
  //   try {
  //     this.$store.commit('clearErr')
  //     this.products = (
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
  components: { Carousel, Carousel2 },
}
</script>

<style scoped></style>
