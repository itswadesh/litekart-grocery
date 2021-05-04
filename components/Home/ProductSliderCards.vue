<template>
  <div class="focus:outline-none">
    <div class="flex flex-row w-full mt-8 focus:outline-none">
      <div
        class="items-center w-full mx-auto bg-white border rounded-lg h-68 focus:outline-none"
      >
        <nuxt-link
          :to="localePath(`/${product.slug}?id=${product.id}`)"
          class="focus:outline-none"
        >
          <span
            class="flex flex-row w-full mx-auto overflow-hidden focus:outline-none"
          >
            <img
              v-lazy="product.img"
              alt=""
              class="object-contain w-40 h-40 mx-auto mt-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            />
          </span>
          <!-- style="height:86px;" -->
          <div
            class="p-2 mx-auto mt-2 text-sm rounded-b sm:px-4 bg-secondary-300 text-start"
          >
            <div class="mt-1 text-sm font-normal text-gray-500">
              {{ product.brand }}
            </div>
            <span>
              <div class="mt-2 text-base font-semibold text-gray-700 truncate">
                {{ product.name }}
              </div>
              <div class="flex flex-row justify-between m-2 mx-auto">
                <span class="flex flex-row">
                  <div
                    class="my-auto text-base font-normal text-center me-2 text-secondary-200"
                  >
                    {{ product.price | currency(settings.currency_symbol) }}
                  </div>
                  <strike
                    class="my-auto text-base font-light"
                    v-if="product.price < product.mrp"
                  >
                    {{ product.mrp | currency(settings.currency_symbol) }}
                  </strike>
                </span>
                <div
                  class="flex items-center justify-center text-center text-white perc"
                  v-if="product.price < product.mrp"
                >
                  {{ Math.floor(100 - (product.price * 100) / product.mrp) }}%
                  off
                </div>
              </div>
            </span>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import TOGGLE from '~/gql/wishlist/toggleWishlist.gql'
export default {
  // ['id', 'slug', 'name', 'price', 'img'],
  props: {
    product: { type: Object },
  },
  // computed:{
  //   bgColor(){
  //     return{
  //       "background-color": this.bgColor,
  //     };
  //   }
  // },
  components: {},
  data() {
    return {
      isActive: false,
      // isWishlist:false,
      products: null,
    }
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
  },
  methods: {
    ...mapMutations({ setErr: 'setErr', success: 'success' }),
    async toggleWishlist(id) {
      // console.log(id)
      this.isActive = true
      let msg = 'Product Added To the Wishlist'
      // console.log(id)
      try {
        const data = (
          await this.$apollo.mutate({
            mutation: TOGGLE,
            variables: {
              product: id,
              variant: id,
            },
            fetchPolicy: 'no-cache',
          })
        ).data.toggleWishlist
        this.success(msg)
        // console.log('add to wishlist', this.toggleWishlist)
      } catch (e) {
        // console.log(e)
        this.setErr(e.toString())
        this.$router.push('/login')
        // console.log(e)
      } finally {
      }
    },
  },
}
</script>

<style scoped>
.perc {
  width: 40px;
  height: 18px;
  background: #2e2e2e;
  border-radius: 3px;
  font-style: normal;
  font-weight: normal;
  font-size: 9px;
  line-height: 7px;
}
</style>
