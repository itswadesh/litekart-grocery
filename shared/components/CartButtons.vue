<template>
  <div>
    <div class="flex" v-if="product">
      <div v-if="product.stock < 1" class="flex items-center text-red-500">
        Out of stock
      </div>
      <div
        v-else-if="
          getItemQty({
            pid: product.pid || product.id,
            vid: selectedVariant ? selectedVariant.id : product.id,
            options: [],
          }) === 0
        "
      >
        <button
          class="w-8 h-8 rounded-full muted"
          :disabled="product.stock < 1 || loading"
          @click="
            addToBag({
              pid: product.pid || product.id,
              vid: product.pid || product.id,
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
      <div v-else>
        <div class="flex flex-wrap">
          <button
            class="w-8 h-8 rounded-full muted"
            @click="
              addToBag({
                pid: product.pid || product.id,
                vid: product.pid || product.id,
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
                  vid: product.pid || product.id,
                  options: [],
                })
              }}
            </div>
            <div class="w-3 h-4 align-middle" v-else>
              <svg
                class="lds-message"
                width="100%"
                height="30px"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
                style="background: none"
              >
                <g transform="translate(20 50)">
                  <circle
                    cx="0"
                    cy="0"
                    r="10"
                    fill="#f05125"
                    transform="scale(0.902712 0.902712)"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      begin="-0.375s"
                      calcMode="spline"
                      keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                      values="0;1;0"
                      keyTimes="0;0.5;1"
                      dur="1s"
                      repeatCount="indefinite"
                    ></animateTransform>
                  </circle>
                </g>
                <g transform="translate(40 50)">
                  <circle
                    cx="0"
                    cy="0"
                    r="10"
                    fill="#fdb813"
                    transform="scale(0.599407 0.599407)"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      begin="-0.25s"
                      calcMode="spline"
                      keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                      values="0;1;0"
                      keyTimes="0;0.5;1"
                      dur="1s"
                      repeatCount="indefinite"
                    ></animateTransform>
                  </circle>
                </g>
                <g transform="translate(60 50)">
                  <circle
                    cx="0"
                    cy="0"
                    r="10"
                    fill="#7fbb42"
                    transform="scale(0.247391 0.247391)"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      begin="-0.125s"
                      calcMode="spline"
                      keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                      values="0;1;0"
                      keyTimes="0;0.5;1"
                      dur="1s"
                      repeatCount="indefinite"
                    ></animateTransform>
                  </circle>
                </g>
                <g transform="translate(80 50)">
                  <circle
                    cx="0"
                    cy="0"
                    r="10"
                    fill="#32a0da"
                    transform="scale(0.0149742 0.0149742)"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      begin="0s"
                      calcMode="spline"
                      keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                      values="0;1;0"
                      keyTimes="0;0.5;1"
                      dur="1s"
                      repeatCount="indefinite"
                    ></animateTransform>
                  </circle>
                </g>
              </svg>
            </div>
          </div>
          <button
            class="w-8 h-8 rounded-full primary"
            :disabled="product.stock < 1 || loading"
            @click="
              addToBag({
                pid: product.pid || product.id,
                vid: product.pid || product.id,
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
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import LoadingIndicator from '../assets/loading.svg?inline'
export default {
  props: {
    product: Object,
    variant: Object,
    selectedVariant: Object,
    selectedOptions: Object,
    notify: Boolean,
  },
  data() {
    return {
      loading: false,
    }
  },
  components: {
    LoadingIndicator,
  },
  methods: {
    ...mapActions({ addToCart: 'cart/addToCart' }),
    async addToBag(obj) {
      try {
        this.loading = true
        await this.addToCart(obj)
        // if (!!this.notify && obj.qty > 0) this.toast()
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    toast() {
      this.$toast
        .show(
          `
      <div class="items-center hidden lg:flex w-72">
        <img class="object-cover w-12 h-12" src="${
          this.product && this.product.img
        }" alt="" />
        <div class="items-center toasted-text">
          <div class="truncate">${this.product.name}</div>
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
    setErr(e) {
      this.$store.commit('setErr', e)
    },
  },
  computed: {
    ...mapGetters({
      cart: 'cart/cart',
      getItemQty: 'cart/getItemQty',
    }),
  },
}
</script>
<style scoped>
/* .cart-button {
  border: 1px solid transparent;
  color: #32325d;
  cursor: pointer;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.23);
}  */

/** Hover Tooltip Css ***/
/* .tooltip {
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
} */
/** End Hover Tooltip Css ***/
</style>
