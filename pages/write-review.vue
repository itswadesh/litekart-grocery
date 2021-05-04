<template>
  <div class="m-2 bg-gray-200">
    <form
      novalidate
      autocomplete="off"
      @submit.stop.prevent="submit()"
      class="my-8 center"
    >
      <div class="flex items-center justify-between p-4 m-2 bg-white shadow-lg">
        <h1 class="text-xl font-semibold">Ratings & Reviews</h1>
        <div class="flex items-center" v-if="product">
          <img :src="product.img" :alt="product.name" class="w-16 rounded-lg" />
          <h2>{{ product.name }}</h2>
        </div>
      </div>
      <div class="flex">
        <div class="hidden w-1/4 mx-2 bg-white border md:block">
          <h3 class="px-5 py-5 font-semibold border-b">
            What makes a good review
          </h3>
          <div class="px-5">
            <div class="py-5 border-b">
              <div class="my-3 text-lg font-semibold">
                Have you used this product?
              </div>
              <div class="text-xs">
                Your review should be about your experience with the product.
              </div>
            </div>
            <div class="py-5 border-b">
              <div class="my-3 text-lg font-semibold">
                Why review a product?
              </div>
              <div class="text-xs">
                Your valuable feedback will help fellow shoppers decide!
              </div>
            </div>
            <div class="py-5">
              <div class="my-3 text-lg font-semibold">
                How to review a product?
              </div>
              <div class="text-xs">
                Your review should include facts. An honest opinion is always
                appreciated. If you have an issue with the product or service
                please contact us from the help centre.
              </div>
            </div>
          </div>
        </div>
        <div class="w-full mr-2 bg-white">
          <ApolloQuery
            :query="require('~/gql/order/hasOrder.gql')"
            :variables="{ product: $route.query.id }"
          >
            <template v-slot="{ result: { error, data }, isLoading }">
              <div v-if="isLoading">
                <div>Loading...</div>
              </div>
              <ErrComponent v-else-if="error" :error="error" />
              <div
                class="flex flex-wrap justify-center mx-2"
                v-else-if="data.hasOrder"
              >
                <div class="px-5 font-semibold border-b">
                  <h3 class="py-5">Rate this product</h3>
                  <div class="w-8">
                    <star-rating v-model="review.rating" :star-size="20" />
                  </div>
                </div>
                <div class="p-5">
                  <h3 class="py-5 font-semibold">Review this product</h3>
                  <textarea
                    v-model="review.message"
                    class="w-full border"
                    rows="15"
                  />
                </div>
                <div class="mx-5 mb-4">
                  <div class="flex justify-between">
                    <div></div>
                    <button
                      class="px-16 py-2 font-semibold text-white bg-orange-600 rounded-sm primary"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
              <div v-else class="flex flex-col items-center justify-center p-4">
                <img src="/macbook.png" alt="" />
                <h1 class="text-3xl font-bold">
                  Haven't purchased this product?
                </h1>
                <p class="text-gray-600">
                  Sorry! You are not allowed to review this product since you
                  haven't bought it on Litekart.
                </p>
                <button
                  type="button"
                  @click="$router.go(-1)"
                  class="w-64 px-4 py-2 mt-4 rounded primary"
                >
                  Go back
                </button>
              </div>
            </template>
          </ApolloQuery>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { Ratingcircle } from '~/shared/components/ui'
import StarRating from 'vue-star-rating'
import saveReview from '~/gql/review/saveReview.gql'
import REVIEWS from '~/gql/review/reviews.gql'
import PRODUCT from '~/gql/product/product.gql'

export default {
  data() {
    return {
      product: null,
      review: { rating: 0, msg: '' },
    }
  },
  components: { Ratingcircle, StarRating },
  async created() {
    this.product = (
      await this.$apollo.query({
        query: PRODUCT,
        variables: { id: this.$route.query.id },
      })
    ).data.product
  },
  methods: {
    async submit() {
      if (!this.review.rating)
        return this.$store.commit('setErr', 'Please rate the item')
      try {
        this.review.product = this.$route.query.id
        await this.$apollo.mutate({
          mutation: saveReview,
          variables: this.review,
        })
        this.$router.push(`/${this.product.slug}`)
      } catch (e) {
        return this.$store.commit('setErr', e)
      }
    },
  },
}
</script>

<style></style>
