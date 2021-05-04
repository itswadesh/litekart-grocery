<template>
  <div class="m-2 md:m-3 focus:outline-none">
    <div class="flex flex-row-reverse w-full focus:outline-none">
      <div
        class="relative w-full mx-auto mt-10 bg-white rounded -ms-16 lg:mt-6 md:ms-0 md:items-center focus:outline-none"
      >
        <!-- <div class="relative z-10 w-1/12 hover:shadow-xl">
          <button
            @click="toggleWishlist(id)"
            v-ripple="'rgba(255, 0,0, 0.5)'"
            class="relative z-10 p-1 m-1 border border-gray-500 rounded-full hover:opacity-75 focus:outline-none"
          >
            <heart-icon
              v-bind:class="[
                isActive
                  ? 'text-gray-500 fill-current'
                  : 'text-accent-900 fill-current',
              ]"
              size="1.1x"
              class="text-gray-500 fill-current"
            ></heart-icon>
          </button>
        </div> -->

        <nuxt-link :to="localePath(`/${slug}?id=${id}`)">
          <span
            class="flex flex-row w-full mx-auto overflow-hidden focus:outline-none"
          >
            <img
              v-lazy="img"
              alt=""
              class="object-cover w-full h-40 mx-auto transition duration-500 ease-in-out transform md:h-48 hover:-translate-y-1 hover:scale-110"
            />
          </span>

          <div
            class="p-2 mx-auto text-sm text-center rounded-b bg-secondary-100"
          >
            <span>
              <!-- style="font-weight: ;" -->
              <span class="text-lg text-gray-700 truncate">{{ name }}</span>
              <span class="text-gray-800">Shop Now</span>
              <h1 class="m-2 mx-auto">
                <span class="font-semibold text-secondary-200 text">
                  {{ price | currency(settings.currency_symbol) }}
               </span>
              </h1>
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
  props: {
    id: { type: String },
    slug: { type: String },
    name: { type: String },
    price: { type: String },
    img: { type: String },
  },
 
  data() {
    return {
      isActive: true,
      products: null,
    }
  },
  created() {
    // console.log(this.$router.currentRoute.path, 'ddddd')
    // if (this.user) console.log('naman')
    // else console.log(this.user)
  },

  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
    user() {
      return this.$store.state.auth.user
    },
  },
  methods: {
    ...mapMutations({ success: 'success', setErr: 'setErr' }),
    async toggleWishlist(id) {
      if (this.user) {
        // console.log(id)
        this.isWishlist = true
        this.wish = false
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
          this.isActive = !this.isActive

          this.success(msg)
          // console.log('add to wishlist', this.toggleWishlist)
        } catch (e) {
          // this.$router.push("/login")

          this.setErr(e.toString())
          // console.log(e)
        } finally {
        }
      } else {
        this.$router.push(`/login`)
      }
    },
  },
}
</script>

<style scoped>
.marginleft {
  margin-left: 28rem;
  /* margin-left: 20rem; */
}
.text {
  font-size: 16px;
  font-weight: 700px;
}
</style>
