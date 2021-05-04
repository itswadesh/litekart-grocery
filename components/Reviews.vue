<template>
  <div class="" v-if="product">
    <div class="flex flex-wrap items-center justify-between px-2 mb-4">
      <h3 class="text-2xl font-bold">Ratings & Reviews</h3>
      <div class="flex items-center" v-if="reviewSummary">
        <div class="flex items-center px-2 mr-2 text-lg rounded-full primary">
          {{ reviewSummary.avg }}
          <StarIcon />
        </div>
        {{ reviewSummary.count }} ratings and {{ reviewSummary.total }} reviews
      </div>
      <nuxt-link
        :to="`/write-review?id=${product.id}`"
        class="block px-4 py-2 rounded-lg primary"
      >
        Rate Product
      </nuxt-link>
    </div>
    <ApolloQuery
      :query="require('~/gql/review/productReviews.gql')"
      :variables="{ product: product.id }"
    >
      <template v-slot="{ result: { error, data }, isLoading }">
        <div v-if="isLoading">
          <div>Loading...</div>
        </div>
        <ErrComponent v-else-if="error" :error="error" />
        <div v-if="!data || !data.productReviews" class="text-center">
          No reviews yet. Be the first to write a review
        </div>
        <!-- <div v-else>
              {{ data.productReviews.data }}
            </div> -->
        <div
          class="flex flex-wrap justify-center mx-2"
          v-else-if="data.productReviews && data.productReviews.data.length > 0"
        >
          <div
            class="flex justify-between"
            v-for="r in data.productReviews && data.productReviews.data"
            :key="r.id"
          >
            <div class="flex items-center">
              <Ratingcircle :rating="r.rating" />
              {{ r.message }}
            </div>
            <!-- <h2 class="text-2xl font-bold">
              {{ r.price | currency(settings.currency_symbol) }}
            </h2>
            <div class="flex justify-around">
              <CartButtons
                :product="product"
                :variant="userSelectedVariant"
                :notify="true"
              />
            </div> -->
          </div>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import REVIEW_SUMMARY from '~/gql/review/reviewSummary.gql'
import PRODUCT_REVIEWS from '~/gql/review/productReviews.gql'
import { StarIcon } from 'vue-feather-icons'
import { Ratingcircle } from '~/shared/components/ui'

export default {
  props: { product: { type: Object, required: true } },
  data() {
    return {
      reviewSummary: {},
      reviews: [],
    }
  },
  components: {
    StarIcon,
    Ratingcircle,
  },
  async created() {
    try {
      this.$store.commit('clearErr')
      this.reviewSummary = (
        await this.$apollo.query({
          query: REVIEW_SUMMARY,
          variables: { product: this.product.id },
        })
      ).data.reviewSummary
      this.reviews = (
        await this.$apollo.query({
          query: PRODUCT_REVIEWS,
          variables: { product: this.product.id },
        })
      ).data.productReviews
    } catch (e) {
      this.$store.commit('setErr', e)
    } finally {
      this.$store.commit('busy', false)
    }
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
  },
}
</script>

<style></style>
