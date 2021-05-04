<template>
  <div>
    <CheckoutHeader />
    <div class="flex flex-wrap justify-between">
      <div class="lg:w-1/5 xs:w-0"></div>
      <div class="px-2 mt-10 lg:w-8 xs:w-0">
        <div class="pt-8">
          <div class="text-left">
            <ul id="progress">
              <li class="progres-li">
                <div class="node green">
                  <p class="mt-3 ml-2 text-white">1</p>
                </div>
              </li>
              <li class="progres-li">
                <div class="divider grey"></div>
              </li>
              <li class="progres-li">
                <div class="node">
                  <p class="mt-3 ml-2 text-gray-500">2</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="px-2 mt-10 xs:w-full lg:w-1/2">
        <div
          class="flex flex-wrap w-full py-3 mt-3 text-lg font-bold text-gray-700 bg-white"
        >
          <div class="text-left">Checkout</div>
        </div>
        <div class="flex justify-between w-full border-b border-gray-200">
          <div class="w-1/4 bg-gray-100">
            <div class="pt-12 pb-2 text-xl text-center text-gray-700">
              Ship to
            </div>
            <ul class="text-center">
              <li class="py-5 font-hairline hover:bg-gray-200">
                <a href="#">Saved Address</a>
              </li>
              <li class="py-5 font-normal bg-white border-l-4 border-pink-500">
                <a href="#">New Address</a>
              </li>
            </ul>
          </div>
          <div class="w-8/12 pb-4">
            <div class="pt-12 pb-2 text-xl text-left text-gray-700">
              Add an address
            </div>
            <form class="w-full p-2 form">
              <Textbox label="Full Name" class="w-full" />
              <Textbox label="Pin Code" class="w-full" />
              <Textbox label="Address" class="w-full" />
              <Textbox label="Landmark" class="w-full" />

              <div class="flex justify-between w-full">
                <Textbox label="Landmark" class="w-1/2" />
                <Textbox label="Landmark" class="w-1/2" />
              </div>
              <Textbox label="Mobile" class="w-full" />
              <button
                class="w-full p-3 mt-3 text-sm font-semibold tracking-widest text-white bg-pink-500 rounded hover:bg-pink-600"
              >
                CONTINUE
              </button>
            </form>
          </div>
        </div>
        <div class="flex py-8 mb-4 border-b border-gray-200">
          <div class="w-1/3 mt-3 font-bold text-black">Pay by</div>
          <div class="w-1/2 mt-3 font-hairline text-gray-600">
            Select a payment method
          </div>
          <div class="w-1/3 text-right">
            <button class="p-3 font-bold text-gray-600 bg-gray-300 rounded">
              CHANGE
            </button>
          </div>
        </div>
      </div>
      <div class="border-r border-gray-300"></div>
      <CartSummary :cart="cart" hidden lg:block>
        <button
          @click="$router.push('/checkout/payment')"
          class="w-full p-3 mt-3 text-sm font-semibold tracking-widest text-white bg-red-600 rounded"
        >
          MAKE PAYMENT
        </button>
      </CartSummary>
      <div class="w-1/5"></div>
    </div>
    <CheckoutFooter />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
const CartItem = () => import('~/components/Cart/CartItem')
const Offers = () => import('~/components/Cart/Offers')
const CartSummary = () => import('~/components/Cart/CartSummary')
const CheckoutHeader = () => import('~/components/Checkout/CheckoutHeader')
const CheckoutFooter = () => import('~/components/Checkout/CheckoutFooter')
import { Textbox } from '~/shared/components/ui'

export default {
  components: {
    CartItem,
    Offers,
    CartSummary,
    CheckoutHeader,
    CheckoutFooter,
    Textbox,
  },
  computed: {
    ...mapGetters({
      cart: 'auth/cart',
      user: 'auth/user',
      showCart: 'cart/showCart',
    }),
  },
}
</script>

<style scoped>
/* form */
form {
  display: inline-block;
}
.field {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
}
label {
  order: -1;
  padding-left: 5px;
  font-size: 14px;
  transition: all 0.3s ease-in;
  transform: translateY(30px);
  pointer-events: none;
}
input:focus + label,
textarea:focus + label {
  transform: translateY(16px);
}
/* form ends */

/* vertical scroll bar starts */
.node {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  transition: all 1000ms ease;
  margin-left: -0.7rem;
  margin-bottom: 0.5rem;
}

.divider {
  height: 42.5rem;
  width: 2px;
  transition: all 800ms ease;
  margin-bottom: 0.5rem;
}

.progres-li {
  list-style: none;
  line-height: 1px;
}

.green {
  background-color: #ed54a4;
}
.grey {
  background-color: lightgray;
}
/* vertical scroll bar ends */
</style>
