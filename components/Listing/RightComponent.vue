<template>
  <div
    class="sticky flex flex-col flex-shrink-0 w-full h-full p-4 -mt-2 bg-white shadow md:mt-2 lg:w-4/5 nowrap flex-nowrap"
  >
    <ListPageSakeleton v-if="loading" />
    <!-- gqp -->
    <div v-if="products">
      <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div v-for="product in products.data" :key="product.id">
          <ListCard
            :name="product.name"
            :slug="product.slug"
            :img="product.img"
            :price="product.price"
            :id="product.id"
            :mrp="product.mrp"
            class="focus:outline-none"
          />
        </div>
        <!-- when no producrt available -->

        <div v-if="products.count == 0" class>
          <div class="w-full m-5 mx-auto">
            <img
              v-lazy="'img/noproduct.png'"
              alt="noproduct"
              class="object-contain mx-auto height"
            />
          </div>
        </div>
      </div>
      <div>
        <!-- <Pagination
          @change="changePage"
          :count="products.count"
          :current="currentPage"
          @next="showNextPage"
        />-->
      </div>
    </div>
    <!-- </span>pagination</span>-->
  </div>
</template>
<script>
import ListCard from '~/components/Listing/ListCard'
import { Pagination } from '~/shared/components/ui'
// import TOGGLE from '~/gql/wishlist/toggleWishlist.gql'
import ListPageSakeleton from '../AllSkeletons/ListPageSakeleton'
import PRODUCTS from '~/gql/product/products.gql'
import { mapMutations } from 'vuex'
export default {
  components: {
    ListPageSakeleton,
    Pagination,
    ListCard,
  },
  data() {
    return {
      currentPage: 1,
      isWishlist: false,
      loading: false,
      products: null,
    }
  },
  mounted() {
    $nuxt.$on('getCategoryDetails', (val) => {
      // console.log(val, 'category details')
    })
  },
  async created() {
    this.getProducts()
  },
  methods: {
    ...mapMutations({ success: 'success', setErr: 'setErr' }),
    changePage(val) {
      this.currentPage = val
      this.getProducts()
    },
    showNextPage() {
      this.currentPage++
      this.getProducts()
    },
    async getProducts() {
      this.loading = true
      try {
        this.products = (
          await this.$apollo.query({
            query: PRODUCTS,
            variables: {
              category: this.$route.query.id,
              page: this.currentPage,
            },
            fetchPolicy: 'no-cache',
          })
        ).data.products
        // console.log(this.products)
        // console.log('categoty', this.products)
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
      }
    },
    // async toggleWishlist(id) {
    //   this.isWishlist = true
    //   // console.log(id)
    //   let msg = 'Product Added To the Wishlist'
    //   try {
    //     const data = (
    //       await this.$apollo.mutate({
    //         mutation: TOGGLE,
    //         variables: {
    //           product: id,
    //           variant: id,
    //         },
    //         fetchPolicy: 'no-cache',
    //       })
    //     ).data.toggleWishlist
    //     this.success(msg)
    //     // console.log('add to wishlist', this.toggleWishlist)
    //   } catch (e) {
    //     // console.log(e)
    //   } finally {
    //     this.isWishlist = true
    //   }
    // },
  },
}
</script>

<style scoped>
.height {
  height: 22rem;
  widows: 26rem;
}
</style>
