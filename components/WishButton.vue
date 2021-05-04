<template>
  <button
    @click="toggleWishlist()"
    class="absolute top-0 right-0 p-2 mt-5 mr-4 bg-gray-400 rounded-full hover:bg-gray-300"
  >
    <img src="/loading.svg" alt="" v-if="loading" class="w-6" />
    <HeartIcon
      v-else
      :class="{ 'text-gray-600': !wished, 'text-red-500': wished }"
    />
  </button>
</template>

<script>
import { HeartIcon } from 'vue-feather-icons'
import { mapGetters, mapMutations } from 'vuex'
import CHECK_WISHLIST from '~/gql/wishlist/checkWishlist.gql'
import TOGGLE_WISHLIST from '~/gql/wishlist/toggleWishlist.gql'
export default {
  props: {
    product: { type: String, required: true },
    variant: { type: String, required: true },
  },
  data() {
    return {
      wished: false,
      loading: false,
    }
  },
  components: { HeartIcon },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null
    },
  },
  created() {
    if (this.user) this.checkWish()
  },
  methods: {
    async checkWish() {
      this.wished = false
      try {
        this.$store.commit('clearErr')
        this.wished = (
          await this.$apollo.query({
            query: CHECK_WISHLIST,
            variables: {
              product: this.product,
              variant: this.variant,
            },
          })
        ).data.checkWishlist
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
        this.$store.commit('busy', false)
      }
    },
    // On click select star
    async toggleWishlist() {
      if (!this.user) this.$router.push('/login')
      this.loading = true
      const p = { product: this.product, variant: this.variant }
      try {
        this.wished = (
          await this.$apollo.mutate({ mutation: TOGGLE_WISHLIST, variables: p })
        ).data.toggleWishlist
        const msg =
          this.wished == true
            ? 'Added to your wishlist'
            : 'Removed from wishlist'
        this.$store.commit('info', msg)
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
