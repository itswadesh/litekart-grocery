<template>
  <ApolloQuery
    :query="require('~/gql/product/bestSellers.gql')"
    :variables="{ store: $store.state.store && $store.state.store.id }"
    :update="(data) => data.bestSellers"
  >
    <template v-slot="{ result: { error, data }, isLoading }">
      <div v-if="isLoading">Loading........</div>

      <ErrComponent v-else-if="error" :error="error" />

      <div v-else-if="data">
        <div class="row center" v-if="data.t && data.t.length > 0">
          <div class="err-banner">Best Sellers on {{ data.t[0]._id.date }}</div>
        </div>
        <div class="flex overflow-x-auto">
          <div
            class="w-1/2 p-2 shadow-lg"
            v-for="d in data.t"
            :key="d._id.id"
            @click="go(`/${d._id.slug}?id=${d._id.id}`)"
          >
            <FoodItem :d="d._id" class="w-full" />
          </div>
        </div>
        <!-- <adsbygoogle /> -->
        <div class="row center mt-4" v-if="data.t1 && data.t1.length > 0">
          <div class="err-banner">
            Best Sellers on {{ data.t1[0]._id.date }}
          </div>
        </div>
        <div class="flex overflow-x-auto">
          <div
            class="w-1/2 p-2 shadow-lg"
            v-for="d in data.t1"
            :key="d._id.id"
            @click="go(`/${d._id.slug}?id=${d._id.id}`)"
          >
            <FoodItem :d="d._id" class="w-full" />
          </div>
        </div>
        <!-- <adsbygoogle /> -->
        <div class="row center mt-4" v-if="data.t2 && data.t2.length > 0">
          <div class="err-banner">
            Best Sellers on {{ data.t2[0]._id.date }}
          </div>
        </div>
        <div class="flex overflow-x-auto">
          <div
            class="w-1/2 p-2 shadow-lg"
            v-for="d in data.t2"
            :key="d._id.id"
            @click="go(`/${d._id.slug}?id=${d._id.id}`)"
          >
            <FoodItem :d="d._id" class="w-full" />
          </div>
        </div>
        <!-- <adsbygoogle /> -->
        <div class="row center mt-4" v-if="data.t3 && data.t3.length > 0">
          <div class="err-banner">
            Best Sellers on {{ data.t3[0]._id.date }}
          </div>
        </div>
        <div class="flex overflow-x-auto">
          <div
            class="w-1/2 p-2 shadow-lg"
            v-for="d in data.t3"
            :key="d._id.id"
            @click="go(`/${d._id.slug}?id=${d._id.id}`)"
          >
            <FoodItem :d="d._id" class="w-full" />
          </div>
        </div>
        <!-- <adsbygoogle /> -->
        <div class="row center mt-4" v-if="data.t4 && data.t4.length > 0">
          <div class="err-banner">
            Best Sellers on {{ data.t4[0]._id.date }}
          </div>
        </div>
        <div class="flex overflow-x-auto">
          <div
            class="w-1/2 p-2 shadow-lg"
            v-for="d in data.t4"
            :key="d._id.id"
            @click="go(`/${d._id.slug}?id=${d._id.id}`)"
          >
            <FoodItem :d="d._id" class="w-full" />
          </div>
        </div>
      </div>
    </template>
  </ApolloQuery>
</template>

<script>
import Vue from 'vue'
import Carousel from './Carousel'
import Carousel2 from './Carousel2'
import bestSellers from '~/gql/product/bestSellers.gql'
import FoodItem from './FoodItem.vue'

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
  components: { Carousel, Carousel2, FoodItem },
}
</script>

<style scoped></style>
