<template>
  <div class="container mx-auto">
    <CheckoutHeader selected="payment" class="" />
    <div
      class="flex flex-col max-w-full pt-8 mx-auto sm:pb-20 xl:container lg:flex-row md:pt-0"
    >
      <div class="w-full lg:w-2/3">
        <div class="flex flex-col w-full">
          <div
            class="hidden pb-6 mt-5 text-2xl text-center text-gray-500 md:text-start md:flex lg:mt-0"
          >
            Payment Methods
          </div>
          <div v-if="paymentMethods && paymentMethods.length > 0">
            <div v-for="p in paymentMethods" :key="p.id">
              <div
                v-if="
                  paymentMethod == 'Stripe' &&
                  p.name == 'Stripe' &&
                  loadedStripe &&
                  p.key &&
                  p.key != null
                "
                class="px-6 py-4 my-2 rounded shadow-lg"
              ></div>

              <label
                class="flex justify-between w-full px-6 py-4 my-2 bg-white rounded shadow-lg cursor-pointer"
              >
                <div class="flex-1">
                  <h2 class="text-xl font-black">{{ p.name }}</h2>
                  <div
                    v-if="p.name != 'COD' && (!p.key || p.key == '')"
                    class="text-center text-red-500"
                  >
                    {{ p.name }} Publishable key is invalid
                  </div>
                  <span v-else>
                    {{ p.text }}
                  </span>
                </div>
                <div class="flex items-center">
                  <img v-lazy="p.img" :alt="p.name" class="w-16 h-12 mx-4" />
                  <Radio
                    v-model="paymentMethod"
                    :value="p.value"
                    :color="p.color"
                  />
                </div>
              </label>
            </div>
          </div>

          <!-- <label
            class="flex flex-col p-4 bg-white border rounded shadow cursor-pointer hover:shadow-lg"
            :class="{ 'border-secondary-500': picked == 'one' }"
          >
            <div class="flex flex-row">
              <input
                type="radio"
                name="group"
                class="w-5 h-5 my-auto me-3 text-secondary-500 focus:ring-1 focus:ring-secondary-500"
                v-model="picked"
                value="one"
              />
              <div
                class="flex flex-col justify-between w-full my-auto text-gray-500 ms-3 sm:flex-row"
              >
                <div class="flex flex-col sm:flex-row">
                  <span class="my-auto">Debit/Creadit Card</span>
                  <span class="my-auto text-sm text-gray-400 sm:ms-3">
                    (no cast EMI available)
                 </span>
                </div>
                <div class="flex flex-row mt-1 md:mt-0">
                  <img
                    src="/img/Mastercard-logo.png"
                    alt="mastercard"
                    class="w-10 h-6 p-1 my-auto border me-2"
                  />
                  <img
                    src="/img/Rupay-Logo.png"
                    alt="rupay"
                    class="w-10 h-6 p-1 my-auto border me-2"
                  />
                  <img
                    src="/img/visa.png"
                    alt="visa"
                    class="w-10 h-6 p-1 my-auto border me-2"
                  />
                  <img
                    src="/img/american.jpg"
                    alt="ae"
                    class="w-10 h-6 p-1 my-auto border"
                  />
                </div>
              </div>
            </div>
            <div v-if="picked == 'one'" class="mt-4">
              <DebitCreditCard />
            </div>
          </label>
          <label
            class="flex flex-col p-4 mt-5 bg-white border rounded shadow cursor-pointer hover:shadow-lg"
            :class="{ 'border-secondary-500': picked == 'five' }"
          >
            <div class="flex flex-row">
              <input
                type="radio"
                name="group"
                class="w-5 h-5 my-auto me-3 text-secondary-500 focus:ring-1 focus:ring-secondary-500"
                v-model="picked"
                value="five"
              />
              <div
                class="flex flex-row justify-between w-full text-gray-500 ms-3"
              >
                <div class="flex flex-row my-auto">
                  <span class="my-auto">Net Banking</span>
                  <span class="my-auto text-sm text-gray-400 ms-3">
                    (Online Transaction)
                 </span>
                </div>
                <div class="flex flex-row">
                  <svg
                    class="w-6 h-6 my-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div v-if="picked == 'five'" class="mt-4">
              <DebitCreditCard />
            </div>
          </label> -->
          <!-- <label
            class="flex flex-col p-4 mt-5 bg-white border rounded shadow cursor-pointer hover:shadow-lg"
            :class="{ 'border-secondary-500': picked == 'two' }"
          >
            <div class="flex flex-row">
              <input
                type="radio"
                color="red"
                name="group"
                class="w-5 h-5 my-auto me-3 text-secondary-500 focus:ring-1 focus:ring-secondary-500"
                v-model="picked"
                value="two"
              />
              <div
                class="flex flex-row justify-between w-full text-gray-500 ms-3"
              >
                <div class="flex flex-col my-auto sm:flex-row">
                  </span>Paypal</span>
                  <span class="my-auto text-sm text-gray-400 sm:ms-3">
                    (International Transaction)
                 </span>
                </div>
                <div class="my-auto">
                  <img
                    src="/img/paypal-logo-png-transparent.png"
                    alt="paypal"
                    class="w-16 p-1 my-auto border h-7"
                  />
                </div>
              </div>
            </div>
            <div v-if="picked == 'two'" class="mt-4">
              <DebitCreditCard />
            </div>
          </label> -->

          <!-- <label
            class="flex flex-col p-4 mt-5 bg-white border rounded shadow cursor-pointer hover:shadow-lg"
            :class="{ 'border-secondary-500': picked == 'three' }"
          >
            <div class="flex flex-row">
              <input
                type="radio"
                name="group"
                class="w-5 h-5 my-auto me-3 text-secondary-500 focus:ring-1 focus:ring-secondary-500"
                v-model="picked"
                value="three"
              />
              <span class="flex flex-row text-gray-500 ms-3"
                >PDO
                <span class="my-auto text-sm text-gray-400 ms-3">
                  (Pay on Delivery)
               </span>
                <span class="my-auto text-sm text-gray-400 ms-3">
                  (Cash/Card/UPI)
               </span></span
              >
            </div>
            <div v-if="picked == 'three'" class="mt-4">
              <DebitCreditCard />
            </div>
          </label>

          <label
            class="flex flex-col p-4 mt-5 bg-white border rounded shadow cursor-pointer hover:shadow-lg"
            :class="{ 'border-secondary-500': picked == 'four' }"
          >
            <div class="flex flex-row">
              <input
                type="radio"
                name="group"
                class="w-5 h-5 my-auto me-3 text-secondary-500 focus:ring-1 focus:ring-secondary-500"
                v-model="picked"
                value="four"
              />
              <div
                class="flex flex-row justify-between w-full text-gray-500 ms-3"
              >
                <div class="flex flex-col my-auto sm:flex-row">
                  <span class="my-auto">UPI</span>
                  <span class="my-auto text-sm text-gray-400 sm:ms-3">
                    (using UPI ID)
                 </span>
                </div>
                <div class="flex flex-row">
                  <img
                    src="/img/phonepe-india.jpg"
                    alt="mastercard"
                    class="w-6 h-6 my-auto border rounded-full me-2"
                  />
                  <img
                    src="/img/Google-Pay-Logo-Icon-PNG.png"
                    alt="rupay"
                    class="w-6 h-6 p-1 my-auto border rounded-full me-2"
                  />
                  <img
                    src="/img/UPI-Logo.png"
                    alt="ae"
                    class="w-10 h-6 p-1 my-auto border"
                  />
                </div>
              </div>
            </div>
            <div v-if="picked == 'four'" class="mt-4">
              <DebitCreditCard />
            </div>
          </label> -->
        </div>
      </div>
      <div
        class="container relative w-full mx-auto mt-6 lg:ms-4 lg:w-1/3 lg:mt-0"
      >
        <span
          class="hidden pb-6 text-2xl text-center text-gray-500 lg:text-start md:flex"
        >
          Cart Summary
        </span>
        <div class="shadow">
          <CheckoutSummary
            :loading="loading"
            class="hidden font-light bg-white rounded sm:flex"
            @submit="submit"
          >
            <span
              v-if="paymentMethod == 'COD'"
              class="font-light tracking-widest"
              >Place Order</span
            >
            <span
              v-else-if="razorpayReady && loadedStripe"
              class="font-light tracking-widest"
              >Pay Now</span
            >
          </CheckoutSummary>
          <!-- <span class="mx-5 border-t"></span> -->
          <h3
            class="pt-5 pl-5 my-auto text-xl font-medium text-gray-600 bg-white ps-5"
          >
            Delivery Address:
          </h3>
          <div class="p-5 font-light bg-white" v-if="address">
            <strong class="capitalize">
              {{ address.firstName }} {{ address.lastName }}</strong
            >
            <div class="mt-1 capitalize">
              {{ address.address }}
            </div>
            <div class="capitalize">
              {{ address.city }} {{ address.state }} {{ address.country }}
            </div>
            <div><strong> Pin: </strong>{{ address.zip }}</div>
            <div class="flex flex-col pt-2">
              <span> <strong> Phone: </strong> {{ address.phone }}</span>
              <span> <strong> Email: </strong> {{ address.email }}</span>
            </div>
          </div>
        </div>
        <CheckoutSummary
          class="bg-white rounded sm:hidden"
          @submit="submit"
          :disabled="loading"
        >
          <span v-if="paymentMethod == 'COD'">Place Order</span>
          <span v-else-if="razorpayReady && loadedStripe">Pay Now</span>
        </CheckoutSummary>
        {{ this.paymentMethod }}
      </div>
    </div>
    <!-- <Footer class="hidden sm:flex" /> -->
  </div>
</template>

<script>
const CheckoutHeader = () => import('~/components/Checkout/CheckoutHeader')
const CheckoutSummary = () => import('~/components/Checkout/CheckoutSummary')
import { Radio } from '~/shared/components/ui'
import ADDRESS from '~/gql/address/address.gql'
import DebitCreditCard from '~/components/Checkout/PaymentOptions/DebitCreditCard'
import CAPTURE_PAY from '~/gql/pay/capturePay.gql'
import RAZORPAY from '~/gql/pay/razorpay.gql'
import CASHFREE from '~/gql/pay/cashfreePayNow.gql'
import STRIPE_MUTATION from '~/gql/pay/stripe.gql'
import VALIDATE_CART from '~/gql/cart/validateCart.gql'
import PAYMENT_METHODS from '~/gql/payment/paymentMethods.gql'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  head() {
    return {
      title: 'Payment',
    }
  },

  middleware({ store, redirect }) {
    if (store.state.cart.qty < 1) return redirect('/cart')
  },
  data() {
    return {
      paymentMethods: null,
      loading: false,
      paymentMethod: null,
      razorpayReady: false,
      stripeReady: false,
      loadedStripe: false,
      complete: false,
      isOpen: false,
      picked: false,
      address: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        town: '',
        city: '',
        country: '',
        zip: '',
        phone: '',
      },
    }
  },
  //  async mounted() {
  // this.address = await this.$axios.$get(
  //   `api/addresses/${this.$route.query.address}`
  // );
  // },
  async created() {
    await this.getPaymentMethods()
    await this.loadStripe()
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      cart: 'cart/cart',
      settings: 'settings',
    }),
    disable() {
      if (this.paymentMethod === 'Stripe')
        return !this.complete || this.errors.any()
      else return this.errors.any()
    },
  },
  methods: {
    ...mapActions({
      applyDiscount: 'cart/applyDiscount',
      checkout: 'cart/checkout',
    }),
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    async getPaymentMethods() {
      try {
        this.loading = true
        const paymentMethods = (
          await this.$apollo.query({
            query: PAYMENT_METHODS,
            variables: { active: true },
          })
        ).data.paymentMethods
        if (paymentMethods && paymentMethods.data) {
          this.paymentMethods = paymentMethods.data
          this.paymentMethod =
            paymentMethods.data[0] && paymentMethods.data[0].value
        }
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    async loadStripe() {
      try {
        this.loading = true
        this.clearErr()
        // const id = this.$route.query.address
        // if(!id)
        this.address = await this.getAddress()
        let razorpayScript = document.createElement('script')
        razorpayScript.setAttribute(
          'src',
          'https://checkout.razorpay.com/v1/checkout.js'
        )
        document.head.appendChild(razorpayScript)
        this.razorpayReady = true

        if (process.browser) {
          let domElement = document.createElement('script')
          domElement.setAttribute('src', 'https://js.stripe.com/v3/')
          domElement.onload = () => {
            this.loadedStripe = true
          }
          document.body.appendChild(domElement)
        }
        // let stripeScript = document.createElement('script')
        // stripeScript.setAttribute('src', 'https://js.stripe.com/v3/')
        // document.head.appendChild(stripeScript)
        // this.stripeReady = true
      } catch (e) {
        this.setErr(e)
      } finally {
        this.loading = false
      }
    },
    async submit() {
      if (this.loading) return
      if (this.address) {
        delete this.address.__typename
        delete this.address.createdAt
        delete this.address.updatedAt
        if (this.address.coords) delete this.address.coords.__typename
      }
      this.clearErr()
      if (this.paymentMethod == 'COD') {
        try {
          this.loading = true
          await this.checkout({
            paymentMethod: 'COD',
            address: this.$route.query.address,
          })
        } catch (e) {
        } finally {
          this.loading = false
        }
        return
      } else if (this.paymentMethod == 'Stripe') {
        try {
          this.loading = true
          const { token } = await createToken()
          if (!token) return this.setErr('Invalid card number')
          let capture = (
            await this.$apollo.mutate({
              mutation: STRIPE_MUTATION,
              variables: {
                address: this.$route.query.address,
                token: token.id,
              },
            })
          ).data.stripe
          this.$router.push(`/payment/success?id=${capture.id}?provider=Stripe`)
        } catch (e) {
          this.setErr(e)
        } finally {
          this.loading = false
        }
        return
      } else if (this.paymentMethod == 'Cashfree') {
        try {
          this.loading = true
          this.clearErr()
          await this.checkout({
            paymentMethod: 'Cashfree',
            address: this.$route.query.address,
          })
        } catch (e) {
          this.setErr(e)
        } finally {
          this.loading = false
          this.busy(false)
        }
      } else if (this.paymentMethod == 'Razorpay') {
        let rp = {}
        try {
          this.loading = true
          // this.address.zip = +this.address.zip
          this.clearErr()
          const vc = (await this.$apollo.query({ query: VALIDATE_CART })).data
            .validateCart
          rp = (
            await this.$apollo.mutate({
              mutation: RAZORPAY,
              variables: { address: this.$route.query.address },
            })
          ).data.razorpay

          var options = {
            key: this.settings.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            name: this.settings.WEBSITE_NAME,
            description: 'Payment for Shopping',
            image: '/icon.png',
            amount: rp.amount,
            order_id: rp.id,
            handler: async function (response) {
              try {
                this.clearErr()
                const capture = (
                  await this.$apollo.mutate({
                    mutation: CAPTURE_PAY,
                    variables: {
                      id: response.razorpay_payment_id,
                      oid: response.razorpay_order_id,
                    },
                  })
                ).data.capturePay
                // this.clearCart()
                this.$router.push(
                  `/payment/success?id=${capture.id}?provider=Razorpay`
                )
              } catch (e) {
                this.setErr(e)
                this.$router.push(
                  `/payment/failed?id=${capture.id}?provider=Razorpay`
                )
              } finally {
                this.busy(false)
              }
            },
            prefill: {
              name: `${this.user && this.user.firstName} ${
                this.user && this.user.lastName
              }`,
              phone: this.user && this.user.phone,
              email: (this.user && this.user.email) || 'support@litekart.in',
              contact: this.user && this.user.phone,
            },
            notes: {
              address: 'note value',
            },
            theme: {
              color: '#F37254',
            },
          }
          var rzp1 = new Razorpay(options)
          rzp1.open()
        } catch (e) {
          this.setErr(e)
        } finally {
          this.loading = false
          this.busy(false)
        }
      } else {
        this.setErr('Payment method not defined')
      }
    },
    async getAddress() {
      try {
        this.loading = true
        return (
          await this.$apollo.query({
            query: ADDRESS,
            variables: { id: this.$route.query.address },
            fetchPolicy: 'no-cache',
          })
        ).data.address
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
  },
  components: {
    CheckoutHeader,
    CheckoutSummary,
    DebitCreditCard,
    Radio,
  },
}
</script>
