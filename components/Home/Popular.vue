<template>
  <ApolloQuery
    :query="require('~/gql/product/popular.gql')"
    :update="(data) => data.popular"
  >
    <template v-slot="{ result: { error, data }, isLoading }">
      <div v-if="isLoading" class="flex">
        <Product class="w-1/2" v-for="(n, ix) in 2" :key="ix" :p="{}" />
      </div>
      <ErrComponent v-else-if="error" :error="error" />
      <div v-else-if="data && data.data.length">
        <Carousel :products="data.data" title="Popular" />
      </div>
      <div v-else>No popular products</div>
    </template>
  </ApolloQuery>
</template>

<script>
import { Product } from '~/shared/components'
import Carousel from './Carousel2'

export default {
  data() {
    return {}
  },
  components: {
    Carousel,
    Product,
  },
}
</script>

<style scoped></style>
