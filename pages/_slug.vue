<template>
  <div class="bg-white">
    <ApolloQuery
      :query="require('~/gql/product/productSlug.gql')"
      :variables="{
        slug: $route.params.slug,
        store: $store.state.store && $store.state.store.id,
      }"
      :update="
        (data) => {
          initProduct(data.productSlug)
          return data.productSlug
        }
      "
    >
      <template v-slot="{ result: { error, data }, isLoading }">
        <DetailPageSkeleton v-if="isLoading" />
        <ErrComponent v-else-if="error" />
        <div v-else-if="data" class="relative flex-wrap block lg:flex">
          <div
            class="flex flex-col px-2 cursor-pointer lg:h-full md:w-6/12 lg:w-5/12"
          >
            <div
              v-if="data.images.length > 1"
              class="flex m-2 overflow-x-auto md:order-2"
            >
              <div
                v-for="(img, ix) in data.images"
                :key="ix"
                @click="selectedImage = img"
                class="p-1 border border-transparent rounded cursor-pointer"
                :class="{ 'border-gray-500': selectedImage == img }"
              >
                <img v-lazy="imgVideo(img)" alt="" class="w-16" />
              </div>
            </div>
            <img
              v-if="!youtubeVideoId(selectedImage)"
              v-lazy="`${selectedImage}`"
              alt
              class="object-cover w-full preview-img-item md:order-1"
              @click="
                $photoswipe.open(0, [{ src: selectedImage, w: 1024, h: 768 }])
              "
            />
            <div class="w-12" v-else>
              <youtube
                :video-id="youtubeVideoId(selectedImage)"
                ref="youtube"
                :resize="true"
              />
            </div>
            <WishButton :product="product.id" :variant="product.id" />
          </div>
          <ProductDetails :product="product" />
        </div>
        <h1 v-else class="mt-20 text-xl text-center">Page/Product not found</h1>
        <CartBar class="lg:hidden" />
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductDetails from '~/components/ProductDetails'
import CartButtons from '~/components/Cart/CartButtons'
import CartBar from '~/components/Cart/CartBar'
import StickyFooter from '~/components/StickyFooter'
import WishButton from '~/components/WishButton'
import { MapPinIcon, StarIcon } from 'vue-feather-icons'

import {
  Ratingcircle,
  DetailPageSkeleton,
  BackButton,
} from '~/shared/components/ui'
import productSlug from '~/gql/product/productSlug.gql'
import productsByIds from '~/gql/product/productsByIds.gql'
// import hasOrder from '~/gql/order/hasOrder.gql'
import { FacebookIcon } from 'vue-feather-icons'
import { getIdFromUrl } from 'vue-youtube'
import { WWW_URL } from '../shared/config'
// const host = process.server
//   ? this.$ssrContext.req.headers.host
//   : window.location.host
export default {
  components: {
    CartButtons,
    ProductDetails,
    StickyFooter,
    CartBar,
    Ratingcircle,
    DetailPageSkeleton,
    BackButton,
    MapPinIcon,
    StarIcon,
    WishButton,
  },
  data() {
    return {
      host: WWW_URL,
      shake: false,
      product: null,
      orderCount: 0,
      // RecentlyViewedProducts: [],
      total: 0,
      avg: 0,
      selectedImage: null,
    }
  },
  methods: {
    imgVideo(url) {
      return this.youtubeVideoId(url)
        ? `https://img.youtube.com/vi/${this.youtubeVideoId(url)}/1.jpg`
        : url
    },
    youtubeVideoId(url) {
      return getIdFromUrl(url)
    },
    async initProduct(product) {
      this.selectedImage = product.img
      if (!product) return
      this.product = product
      const id = product.id
      if (!id) return
      // let recentlyViewed = localStorage.getItem('recent')
      // if (recentlyViewed) {
      //   recentlyViewed = JSON.parse(recentlyViewed)
      //   if (!recentlyViewed) recentlyViewed = []
      //   recentlyViewed.reverse()
      //   if (!recentlyViewed.includes(id)) {
      //     recentlyViewed.push(id)
      //     localStorage.setItem('recent', JSON.stringify(recentlyViewed))
      //   }
      // } else {
      //   let productId = []
      //   productId.push(id)
      //   localStorage.setItem('recent', JSON.stringify(productId))
      // }
      try {
        this.$store.commit('clearErr')
        // this.hasOrder = rs.hasOrder
        // if (recentlyViewed && recentlyViewed.length > 0) {
        //   this.RecentlyViewedProducts = (
        //     await this.$apollo.query({
        //       query: productsByIds,
        //       variables: { ids: recentlyViewed },
        //     })
        //   ).data.productsByIds
        // }
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
        this.$store.commit('busy', false)
      }
    },
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      settings: 'settings',
      cart: 'cart/cart',
    }),
    calculateOffPercent() {
      if (!this.product || !this.product) return 0
      let percent =
        ((this.product.mrp - this.product.price) * 100) / this.product.mrp
      return Math.round(percent)
    },
    calculatePrice() {
      let price = 0
      if (this.product.price < this.product.mrp) {
        price = this.product.price
      } else {
        price = this.product.mrp
      }
      return price
    },
  },
  head() {
    const host = process.server
      ? this.$ssrContext.req.headers.host
      : window.location.host
    return {
      title:
        (this.product && this.product.metaTitle) ||
        (this.product && this.product.name),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            (this.product && this.product.metaDescription) ||
            (this.product && this.product.description),
        },
        {
          hid: 'keywords',
          name: 'Keywords',
          property: 'keywords',
          content:
            (this.product && this.product.metaKeywords) ||
            (this.product && this.product.keywords),
        },

        // OpenGraph data
        {
          hid: 'og:title',
          name: 'og_title',
          property: 'og:title',
          content:
            (this.product && this.product.metaTitle) ||
            (this.product && this.product.name),
        },
        {
          hid: 'og:description',
          name: 'Description',
          property: 'og:description',
          content:
            (this.product && this.product.metaDescription) ||
            (this.product && this.product.description),
        },
        // {
        //   name: "og_url",
        //   property: "og:url",
        //   content:
        //     host + "/" + this.product &&
        //     this.product.slug + "?id=" + this.product &&
        //     this.product._id
        // },
        {
          name: 'og_image',
          property: 'og:image',
          content:
            (this.product &&
              this.settings &&
              this.settings.CDN_URL + this.product.img) ||
            this.settings.social_share,
        },
        {
          property: 'og:image:width',
          content: '600',
        },
        {
          property: 'og:image:height',
          content: '600',
        },
        // Twitter
        {
          name: 'twitter:title',
          content:
            (this.product && this.product.metaTitle) ||
            (this.product && this.product.name),
        },
        {
          name: 'twitter:description',
          content:
            (this.product && this.product.metaDescription) ||
            (this.product && this.product.description),
        },
        {
          name: 'twitter:image:src',
          content:
            (this.product &&
              this.settings &&
              this.settings.CDN_URL + this.product.img) ||
            this.settings.open_graph_image,
        },
        // Google / Schema.org markup:
        {
          hid: 'product_name',
          itemprop: 'name',
          content: this.product && this.product.name,
        },
        {
          hid: 'product_description',
          itemprop: 'description',
          content:
            (this.product && this.product.metaDescription) ||
            (this.product && this.product.description),
        },
        {
          hid: 'product_image',
          itemprop: 'image',
          content:
            (this.product &&
              this.settings &&
              this.settings.CDN_URL + this.product.img) ||
            this.settings.open_graph_image,
        },
        {
          hid: 'product_price',
          name: 'product_price',
          property: 'product:price',
          content: this.product && this.product.price,
        },
      ],
    }
  },
}
</script>

<style scoped></style>
