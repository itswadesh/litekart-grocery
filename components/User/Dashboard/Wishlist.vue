<template>
  <div class="h-full max-w-full mx-auto">
    <div class="text-gray-600">
      <div
        v-if="Listloading"
        class="grid w-auto grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6"
      >
        <WishlistSkeleton v-for="(p, ix) in 10" :key="ix + '-1'" />
      </div>
      <div v-if="myWishlist" class="container mx-auto">
        <!-- <div >{{ myWishlist.count }}</div> -->
        <div v-if="myWishlist.count != 0" class="relative">
          <div>
            <div class="flex flex-shrink-0 bg-white rounded-sm shadow">
              <div class="p-5 pl-8 text-lg font-normal text-gray-700">
                My Wishlist({{ myWishlist.count }})
              </div>
            </div>
            <div
              class="grid w-auto grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6"
            >
              <div
                v-for="w in myWishlist.data"
                :key="w.id"
                class="shadow cursor-pointer hover:text-accent-800"
              >
                <div v-if="w.product">
                  <div class="flex justify-end p-1 bg-white">
                    <button
                      @click="toggleWishlist(w.product.id)"
                      class="z-30 flex justify-end focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6 text-gray-400 hover:text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <nuxt-link
                    :to="localePath(`/${w.product.slug}?id=${w.product.id}`)"
                    class="cols-span-1"
                  >
                    <div class="">
                      <div
                        class="flex flex-row w-full mx-auto overflow-hidden bg-white focus:outline-none"
                      >
                        <img
                          v-lazy="w.product.img"
                          alt="mobile"
                          class="object-contain w-full h-40 transition duration-500 ease-in-out transform md:h-56 hover:-translate-y-1 hover:scale-110"
                        />
                      </div>
                      <div
                        class="p-2 mx-auto text-sm text-center rounded-b bg-accent-100"
                      >
                        <div>
                          <div class="truncate text-medium">
                            {{ w.product.name }}
                          </div>
                          <div class="text-secondary-200">Shop Now</div>
                          <div class="flex flex-row justify-center m-2 mx-auto">
                            <div class="text-accent-900">
                              {{
                                w.product.price
                                  | currency(settings.currency_symbol)
                              }}
                            </div>
                            <strike
                              v-if="w.product.price < w.product.mrp"
                              class="mx-2"
                            >
                              {{
                                w.product.mrp
                                  | currency(settings.currency_symbol)
                              }}
                            </strike>
                            <div
                              class="my-auto text-xs text-secondary-200"
                              v-if="w.product.price < w.product.mrp"
                            >
                              {{
                                Math.floor(
                                  (w.product.price * 100) / w.product.mrp
                                )
                              }}% off
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
          <!-- if there is no items in cart -->
        </div>
        <div v-else>
          <div class="bg-white rounded-lg shadow">
            <div class="flex flex-col p-6">
              <div class="flex flex-col items-center justify-center p-5">
                <img
                  v-lazy="'/default_images/empty-wish-list.png'"
                  alt="emptycart"
                  class="h-48 w-52"
                />
                <div class="p-3 text-xl">Empty Wishlist!</div>
                <div class="text-xs text-center">
                  You have no items in your Wishlist. Start adding
                </div>
                <nuxt-link :to="localePath('/')">
                  <button
                    class="p-2 px-8 m-3 text-sm font-semibold text-center text-white border rounded shadow focus:ring-opacity-50 hover:bg-yellow-600 focus:ring focus:ring-offset-2 focus:ring-yellow-600 bg-primary-500 border-primary-500 focus:outline-none"
                  >
                    Shop Now
                  </button>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WishlistSkeleton from '~/components/AllSkeletons/WishlistSkeleton'
import { mapGetters, mapActions } from 'vuex'
import MY_WISHLIST from '~/gql/wishlist/myWishlist.gql'
import TOGGLE from '~/gql/wishlist/toggleWishlist.gql'
export default {
  components: { WishlistSkeleton },
  data() {
    return {
      loading: false,
      Listloading: false,
      myWishlist: null,
    }
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
  },

  async created() {
    await this.getWishlist()
  },
  methods: {
    async getWishlist(id) {
      this.Listloading = true
      // console.log('getting wishlist', this.getWishlist)
      try {
        this.myWishlist = (
          await this.$apollo.query({
            query: MY_WISHLIST,
            fetchPolicy: 'no-cache',
          })
        ).data.myWishlist
        // console.log('wishlist......', this.myWishlist)
      } catch (e) {
        // console.log(e)
      } finally {
        this.Listloading = false
      }
    },
    async toggleWishlist(id) {
      this.loading = true
      // console.log()
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
        await this.getWishlist()
        // console.log('add to wishlist', this.toggleWishlist)
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
