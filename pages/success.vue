<template>
  <div class="bg-white h-screen">
    <BackButton to="/" />
    <GMap class="w-full h-72" />
    <div class="text-xl text-center font-bold bg-white py-3" v-if="loading">
      Searching Order
    </div>
    <h1 class="text-xl text-center font-bold bg-white py-3" v-else-if="!order">
      Order Not Found
    </h1>
    <div v-else class>
      <h2
        v-if="order.delivery"
        class="text-md text-center font-bold bg-white py-3 bg-yellow-200 text-gray-500 border-t border-b-2 border-dashed mb-2"
      >
        OTP:
        <span class="text-primary">{{ order.delivery.otp }}</span>
      </h2>
      <div class="w-full mt-4 px-4 text-lg tracking-wider">
        {{ order.items[0].status }}
        <div
          v-for="(s, ix) in settings.orderStatuses"
          :key="ix"
          v-if="s.public"
          class="py-2 flex border-b py-4"
          :class="{
            'text-green-500': index == ix,
            'opacity-25': s.status !== order.items[0].status,
          }"
        >
          <div class="flex-1 leading-tight">
            <span class="text-lg font-bold">{{ s.title }}</span>
            <br />
            <span class="text-gray-600 text-xs">{{ s.body }}</span>
          </div>
          <div class="flex">
            <div
              v-if="s.status == order.items[0].status"
              class="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center"
            >
              <CheckIcon class="text-white" />
            </div>
            <img v-else class="ml-4 w-12 h-12" v-lazy="s.icon" alt />
          </div>
        </div>
      </div>
      <div class="text-center my-4">
        OTP:
        <span class="font-bold text-red-500">{{ order.otp }}</span>
      </div>
      <button
        @click="refresh()"
        class="flex items-center justify-center w-full text-white fixed bottom-0 text-center primary py-4"
      >
        Refresh order status
        <RefreshCwIcon class="ml-2" />
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { GMap, BackButton } from '~/shared/components/ui'
import StickyFooter from '~/components/StickyFooter.vue'
import order from '~/gql/order/order.gql'
import clearCart from '~/gql/cart/clearCart.gql'
import SUBSCRIPTION_ORDER_UPDATED from '~/gql/order/SUBSCRIPTION_ORDER_UPDATED.gql'
import Push from 'push.js'
import { CheckIcon, RefreshCwIcon } from 'vue-feather-icons'

export default {
  middleware: ['isAuth'],
  components: {
    GMap,
    BackButton,
    StickyFooter,
    CheckIcon,
    RefreshCwIcon,
  },
  apollo: {
    $subscribe: {
      orderUpdated: {
        query: SUBSCRIPTION_ORDER_UPDATED,
        variables() {
          return {
            id: this.$route.query.id,
          }
        },
        result({ data }) {
          this.order = data.orderUpdated
          const status = this.order.items[0].status
          const currentStatus = this.settings.orderStatuses.filter(
            (s) => s.status == status
          )[0]
          Push.create(currentStatus.title, {
            body: currentStatus.body,
            icon: currentStatus.icon,
          })
        },
      },
    },
  },
  data() {
    return {
      order: null,
      loading: false,
      index: -1,
    }
  },
  computed: {
    ...mapGetters({ settings: 'settings' }),
  },
  methods: {
    async refresh() {
      try {
        this.loading = true
        this.$store.commit('clearErr')
        this.order = (
          await this.$apollo.query({
            query: order,
            variables: { id: this.$route.query.id },
            fetchPolicy: 'no-cache',
          })
        ).data.order
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
        this.$store.commit('busy', false)
        this.loading = false
      }
    },
  },
  async mounted() {
    this.$store.dispatch('cart/fetch')
    await this.refresh()
    try {
      this.$refs.map.route(
        `${this.order.delivery.start.lat},${this.order.delivery.start.lng}`,
        `${this.order.delivery.finish.lat},${this.order.delivery.finish.lng}`
      )
    } catch (e) {
    } finally {
      this.loading = false
    }
  },
}
</script>
