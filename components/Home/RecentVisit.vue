<template>
  <div v-if="isLoading">Loading........</div>
  <ErrComponent v-else-if="error" :error="error" />
  <div v-else-if="products && products.length">
    <Carousel :products="products" title="Recent Items" />
  </div>
</template>

<script>
// import Vue from 'vue'
import Carousel from './Carousel2'
import productsByIds from '~/gql/product/productsByIds.gql'

export default {
  data() {
    return {
      products: [],
      isLoading: false,
      error: null,
    }
  },
  async created() {
    // if (!process.server) {
    //   let recentlyViewd = localStorage.getItem('recent')
    //   recentlyViewd = JSON.parse(recentlyViewd)
    //   if (!recentlyViewd) recentlyViewd = []
    //   recentlyViewd.reverse()
    //   if (recentlyViewd && recentlyViewd.length > 0) {
    //     try {
    //       this.isLoading = true
    //       this.$store.commit('busy', true)
    //       this.products = (
    //         await this.$apollo.query({
    //           query: productsByIds,
    //           variables: { ids: recentlyViewd },
    //         })
    //       ).data.productsByIds
    //     } catch (e) {
    //       this.error = e
    //       this.$store.commit('setErr', e)
    //     } finally {
    //       this.isLoading = false
    //       this.$store.commit('busy', false)
    //     }
    //   }
    // }
  },
  methods: {
    go(url) {
      this.$router.push(url)
    },
    clearRecentItems() {
      // localStorage.setItem('recent', [])
      // this.$emit('clearRecentItems')
    },
  },
  components: {
    Carousel,
  },
}
</script>

<style scoped></style>
