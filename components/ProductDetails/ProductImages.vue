<template>
  <div class="flex flex-col flex-shrink-0 bg-gray-50 xl:bg-white hfull nowrap">
    <div class="sm:ms-3 xl:me-0">
      <div class="flex flex-row justify-end pb-4 pe-4 md:hidden">
        <Share :data="product" :host="host" />
        <WishButton
          :rounded="true"
          :pid="product.id"
          v-if="product.id"
          class="p-1 w-7 h-7"
        />
      </div>
      <!-- desktop and tablet -->
      <div
        v-if="img && !loading"
        class="flex-col hidden w-auto md:flex-row sm:flex"
      >
        <div
          class="relative z-10 mx-auto overflow-hidden bg-white border-2 rounded-sm widths"
        >
          <div class="absolute right-0 flex justify-end m-3">
            <WishButton
              :rounded="true"
              :pid="product.id"
              v-if="product.id"
              class="z-50 hidden w-8 h-8 p-1 md:flex"
            />
          </div>
          <img
            v-lazy="selectedImage"
            v-if="!youtubeVideoId(selectedImage)"
            :key="selectedImage"
            alt=""
            @click="
              $photoswipe.open(0, [{ src: selectedImage, w: 1024, h: 768 }])
            "
            class="object-contain w-full h-full mx-auto my-auto preview-img-item"
          />

          <div class="w-12" v-else>
            <youtube
              :video-id="youtubeVideoId(selectedImage)"
              ref="youtube"
              :resize="true"
            />
          </div>
        </div>
        <div class="">
          <ProductImgThumbnails
            v-if="images && images.length > 1"
            @selectedImage="popup"
            :images="images"
            :selectedImage="selectedImage || img"
            class="pl-4 overflow-hidden cursor-pointer"
          />
        </div>
      </div>

      <!-- mobile -->

      <div class="w-full">
        <div v-if="images && images.length > 0" class="mx-auto sm:hidden">
          <div class="w-full mx-auto widths">
            <VueSlickCarousel
              ref="c1"
              :asNavFor="$refs.c2"
              :focusOnSelect="true"
            >
              <div
                v-for="(img, ix) in images"
                :key="ix"
                class="bg-white border h-80 focus:outline-none"
              >
                <img
                  v-lazy="img"
                  alt="img"
                  class="object-cover w-full h-full"
                />
              </div>
            </VueSlickCarousel>
          </div>
          <div class="w-full mt-10 px-7">
            <VueSlickCarousel
              ref="c2"
              :asNavFor="$refs.c1"
              :slidesToShow="4"
              :focusOnSelect="true"
              class="mx-auto"
            >
              <div
                v-for="(img, ix) in images"
                :key="ix"
                class="h-20 mx-auto focus:outline-none"
              >
                <img
                  v-lazy="img"
                  alt="img"
                  class="object-cover w-16 h-16 mx-auto my-2 border rounded"
                />
              </div>
            </VueSlickCarousel>
          </div>
        </div>
      </div>
    </div>
    <!-- <ShareMobile
        :open="showSharePanel"
            @close="showSharePanel=!showSharePanel"
            :class="showSharePanel ? 'open' : 'close'"
          /> -->
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import ProductImgThumbnails from './ProductImgThumbnails'
import { getIdFromUrl } from 'vue-youtube'
import Share from '~/components/ProductDetails/Share'

export default {
  props: {
    loading: Boolean,
    images: Array,
    pid: String,
    img: String,
    product: Object,
    host: String,
  },
  data() {
    return {
      share: false,
      showSharePanel: false,
      hide: false,
      isBuyProduct: false,
      show: true,
      selectedImage: null,
    }
  },
  components: {
    ProductImgThumbnails,
    Share,
  },
  async created() {
    this.selectedImage = this.img
    // await this.getProduct()
  },
  // computed: {
  // ...mapGetters({
  //   cart: 'cart/cart',
  //   getItemQty: 'cart/getItemQty',
  // }),
  // calculateOffPercent() {
  //   if (!this.product || !this.product) return 0
  //   let percent =
  //     ((this.product.mrp - this.product.price) * 100) / this.product.mrp
  //   return Math.round(percent)
  // },
  // calculatePrice() {
  //   let price = 0
  //   if (this.product.price < this.product.mrp) {
  //     price = this.product.price
  //   } else {
  //     price = this.product.mrp
  //   }
  //   return price
  // },
  // },
  methods: {
    ...mapMutations({ success: 'success' }),
    imgVideo(url) {
      return this.youtubeVideoId(url)
        ? `https://img.youtube.com/vi/${this.youtubeVideoId(url)}/1.jpg`
        : url
    },
    youtubeVideoId(url) {
      return getIdFromUrl(url)
    },
    // async getProduct() {
    //   this.loading = true
    //   try {
    //     this.product = (
    //       await this.$apollo.query({
    //         query: PRODUCT,
    //         variables: { id: this.$route.query.id },
    //         fetchPolicy: 'no-cache',
    //       })
    //     ).data.product
    //     this.selectedImage = this.product.img
    //     // console.log('product details', this.product)
    //   } catch (e) {
    //     // console.log(e)
    //   } finally {
    //     this.loading = false
    //   }
    // },

    // async buyProduct(obj) {
    //   this.isBuyProduct = true
    //   // await this.checkOut(obj)
    // },
    // async checkOut() {
    //   try {
    //     const data = (
    //       await this.$apollo.mutate({
    //         mutation: CHECKOUT,
    //         variables: {
    //           address: {},
    //           paymentMethod: 'COD',
    //         },
    //       })
    //     ).data.checkout
    //     if (this.isBuyProduct) {
    //       this.$router.push('/checkout')
    //     }
    //     // console.log('address reciewved', data)
    //   } catch (e) {
    //     // console.log(e)
    //   } finally {
    //   }
    // },
    // async toggleWishlist(id) {
    //   ;(this.isDisabled = true), (this.isWishlist = true)
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
    //     ;(this.isDisabled = true), (this.isWishlist = true)
    //   }
    // },
    popup(val) {
      this.selectedImage = val
    },
    hideOffers() {
      this.showOffers = false
    },
  },
}
</script>

<style scoped>
.widths {
  width: 295px;
  height: 291px;
}
@media only screen and (min-width: 640px) {
  .widths {
    width: 470px;
    height: 370px;
  }
}

@media only screen and (min-width: 768px) {
  .hfull {
    height: 28.2rem;
  }
  .widths {
    width: 90%;
    /* width: 27rem; */
    height: 28.2rem;
  }
}
@media only screen and (min-width: 1024px) {
  .hfull {
    height: 28.2rem;
  }
  .widths {
    /* width: 27rem; */
    width: 100%;
    height: 28.2rem;
  }
}
</style>
