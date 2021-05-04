<template>
  <div class="w-full mb-20 leading-relaxed md:w-6/12 lg:w-7/12">
    <div class="mt-8 mb-3 bg-gray lg:mb-0">
      <div class="px-3 pb-4 border-b border-gray-200">
        <p class="text-2xl font-semibold headings">{{ product.brandName }}</p>
        <p class="text-xl font-bold">{{ product.name }}</p>
      </div>
      <div
        class="flex items-center px-3 py-3 font-semibold tracking-wider sizeSelector headings"
        v-if="product"
      >
        <div>
          <span class="mr-2 text-4xl">
            {{
              selectedVariant
                ? selectedVariant.price
                : product.price | currency(settings.currency_symbol)
            }}
          </span>
          <span
            class="mr-2 text-lg font-hairline line-through"
            v-if="
              (selectedVariant ? selectedVariant.mrp : product.mrp) >
              (selectedVariant ? selectedVariant.price : product.price)
            "
          >
            {{
              selectedVariant
                ? selectedVariant.mrp
                : product.mrp | currency(settings.currency_symbol)
            }}
          </span>
          <span class="text-xl text-orange-500" v-if="calculateOffPercent > 0">
            ({{ calculateOffPercent }}% OFF)
          </span>
        </div>
        <div
          class="bottom-0 z-10 flex justify-end w-full py-2 bg-white lg:relative lg:px-3 md:justify-start"
        >
          <div
            v-if="(selectedVariant ? selectedVariant.stock : product.stock) < 1"
            class="flex items-center text-red-500"
          >
            Out of stock
          </div>
          <button
            v-if="
              getItemQty({
                pid: product.pid || product.id,
                vid: selectedVariant ? selectedVariant.id : product.id,
                options: selectedOptions,
              }) === 0
            "
            :disabled="
              !product ||
              !product.price ||
              product.stock == 0 ||
              $store.state.loading
            "
            @click="
              addToBag({
                pid: product.id,
                vid: selectedVariant ? selectedVariant.id : product.id,
                options: selectedOptions,
                vendor: (selectedVariant
                  ? selectedVariant.vendor
                  : product.vendor || {}
                ).id,
                qty: 1,
              })
            "
            class="w-7/12 px-6 py-2 mr-2 text-sm font-bold text-white rounded lg:w-1/3 primary lg:text-lg"
          >
            ADD TO BAG
          </button>
          <div v-else class="text-center">
            <div class="flex flex-wrap">
              <button
                class="w-8 h-8 rounded-full muted"
                @click="
                  addToBag({
                    pid: product.pid || product.id,
                    vid: selectedVariant ? selectedVariant.id : product.id,
                    options: selectedOptions,
                    vendor: (selectedVariant
                      ? selectedVariant.vendor
                      : product.vendor || {}
                    ).id,
                    qty: -1,
                  })
                "
              >
                <svg
                  class="m-auto align-middle transition-all ease-out"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17 11a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2h10z" />
                </svg>
              </button>
              <div class="flex items-center px-2 text-center">
                <div v-if="!loading">
                  {{
                    getItemQty({
                      pid: product.pid || product.id,
                      vid: selectedVariant ? selectedVariant.id : product.id,
                      options: selectedOptions,
                    })
                  }}
                </div>
                <img
                  alt="..."
                  class="w-3 h-4 align-middle"
                  src="/loading.svg"
                  v-else
                />
              </div>
              <button
                class="w-8 h-8 rounded-full primary"
                :disabled="product.stock < 1 || loading"
                @click="
                  addToBag({
                    pid: product.pid || product.id,
                    vid: selectedVariant ? selectedVariant.id : product.id,
                    options: selectedOptions,
                    vendor: (selectedVariant
                      ? selectedVariant.vendor
                      : product.vendor || {}
                    ).id,
                    qty: 1,
                  })
                "
              >
                <svg
                  class="m-auto transition-all ease-out align-middl"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    class="heroicon-ui"
                    d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <p class="ml-4 text-sm font-hairline">
        Additional tax shall apply, charged at checkout
      </p>
    </div>

    <div>
      <hr class="mb-4" />
      <SocialSharing :data="product" />
      <div
        class="px-3 py-8 my-3 bg-gray-100 border-b border-gray-300 lg:my-0"
        v-if="product.details"
      >
        <p class="text-lg font-bold">
          PRODUCT DETAILS
          <ListIcon class="ml-2 text-gray-600" aria-hidden="true" />
        </p>
        <span class="text-gray-500">{{ product.detail }}</span>
      </div>
      <div class="px-3 py-3" v-if="product.features">
        <p class="text-lg font-bold">Specifications</p>
        <div class="flex w-full py-1">
          <div
            class="w-1/2 mr-4 border-b border-gray-400"
            v-for="f in product.features"
            :key="f.id"
          >
            <p class="text-xs text-gray-500">{{ f.key }}</p>
            <span class="text-sm headings">{{ f.val }}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div
        class="flex flex-wrap justify-center mx-2"
        v-for="o in options"
        :key="o.id"
      >
        {{ o.name }}
        <Radio
          v-model="selectedOptions[o.name]"
          v-for="v in o.values"
          :key="v.id"
          :label="v.name"
          :value="v.name"
          @change="findVariation"
        >
          {{ v.name }}
        </Radio>
      </div>
    </div>
    <div class="px-2 mt-8">
      <h1 class="text-2xl">Why shop from {{ settings.websiteName }}?</h1>
      <div class="flex items-center py-4 my-4 border-b">
        <PackageIcon size="2x" class="mr-4" />
        <div class>
          <p class="leading-none text-gray-900">Easy returns & refunds</p>
          <p class="text-gray-600">
            Return products at doorstep and get refund in seconds.
          </p>
        </div>
      </div>
      <div class="flex items-center py-4 my-4 border-b">
        <DollarSignIcon size="2x" class="mr-4" />
        <div class>
          <p class="leading-none text-gray-900">Lowest price guaranteed</p>
          <p class="text-gray-600">
            Get difference refunded if you find it cheaper anywhere else.
          </p>
        </div>
      </div>
      <Reviews :product="product" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import {
  PackageIcon,
  ListIcon,
  DollarSignIcon,
  StarIcon,
} from 'vue-feather-icons'
import SocialSharing from '~/components/SocialSharing'
import Reviews from '~/components/Reviews'
import { Ratingcircle, Radio } from '~/shared/components/ui'
import OPTIONS from '~/gql/option/options.gql'
import GET_VARIANT from '~/gql/product/getVariant.gql'
import OPTION from '~/gql/option/option.gql'
import SAVE_OPTION from '~/gql/option/saveOption.gql'
import REMOVE_OPTION from '~/gql/option/removeOption.gql'

export default {
  props: {
    product: { type: Object },
  },
  components: {
    PackageIcon,
    DollarSignIcon,
    SocialSharing,
    ListIcon,
    Ratingcircle,
    StarIcon,
    Reviews,
    Radio,
  },
  data() {
    return {
      wished: false,
      loading: false,
      shake: false,
      groupProducts: [],
      sizepopup: false,
      productDescription: false,
      selectedOptions: {},
      options: [],
      selectedVariant: null,
    }
  },
  async created() {
    let options = (this.options = (
      await this.$apollo.query({
        query: OPTIONS,
        variables: { pid: this.product.id },
        fetchPolicy: 'no-cache',
      })
    ).data.options.data)
    let oo = {}
    for (let o of options) {
      for (let v of o.values) {
        if (v.default) oo[o.name] = v.id
      }
    }
    this.selectedOptions = oo
  },
  computed: {
    ...mapGetters({
      getItemQty: 'cart/getItemQty',
      settings: 'settings',
    }),
    user() {
      return (this.$store.state.auth || {}).user || null
    },
    calculateOffPercent() {
      if (!this.product) return 0
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
  methods: {
    ...mapMutations(['setErr']),
    ...mapActions({ addToCart: 'cart/addToCart' }),
    pushToLogin() {
      const query = this.$route.query
      let route = this.$route.path
      route = route.substr(1)
      if (!query || !query.id) this.$router.push(`/login?return=${route}`)
      else this.$router.push(`/login?return=${route}?id=${query.id}&wish=true`)
    },
    toast() {
      this.$toast
        .show(
          `
      <div class="items-center hidden lg:flex w-72">
        <img class="object-cover w-12 h-12" src="${this.product.img}" alt="" />
        <div class="items-center toasted-text">
          <div class="text-xs text-gray-600">Added to your cart</div>
        </div>
      </div>
      `,
          {
            containerClass: 'sw-toast-container',
            theme: 'outline',
            position: 'top-right',
            singleton: false,
            action: {
              text: 'View Cart',
              onClick: (e, toastObject) => {
                this.$router.push('/cart')
                toastObject.goAway(0)
              },
            },
          }
        )
        .goAway(5000)
    },
    go(url) {
      this.$router.push(url)
    },
    async findVariation() {
      const pid = this.product.id
      const obj = this.selectedOptions
      const options = Object.keys(obj).map(function (key) {
        return { name: key, val: obj[key] }
      })
      // console.log('options', options)
      try {
        this.$store.commit('clearErr')
        const variant = (
          await this.$apollo.query({
            query: GET_VARIANT,
            variables: { pid, options },
            fetchPolicy: 'no-cache',
          })
        ).data.getVariant
        this.selectedVariant = variant
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
        this.$store.commit('busy', false)
      }
    },
    addToBag(obj) {
      // console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz', this.options)
      for (let o of this.options) {
        if (!this.selectedOptions[o.name])
          return this.$store.commit('setErr', `Please select ${o.name}`)
      }
      // obj.options = JSON.stringify(this.selectedOptions)39
      // obj.vid = this.selectedVariant.id
      // console.log('Add to cart', obj)
      this.addToCart(obj)
      // if (obj.qty > 0) this.toast()
    },
    error(err) {
      this.setError(err.err)
    },
    clearRecentItems() {
      // this.RecentlyViewedProducts = []
    },
  },
}
</script>

<style scoped>
/** Hover Tooltip Css ***/
.tooltip {
  position: relative;
  display: inline-block;
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: 82px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 3px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-bottom: 7px;
  margin-left: -38px;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}
.tooltip .tooltiptext {
  opacity: 0;
  transition: opacity 0.5s;
}
.tooltip:hover .tooltiptext {
  opacity: 1;
}
.tooltip .tooltiptext::after {
  content: ' ';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}
/** End Hover Tooltip Css ***/

.shake-animation {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  border: 1px solid red;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
