<template>
  <div class="container mx-auto w-full lg:w-1/2 text-center bg-white mb-20">
    <HeadingFlat>Order Details</HeadingFlat>
    <ApolloQuery
      :query="require('~/gql/order/order.gql')"
      :variables="{
        id: $route.params.id,
        store: $store.state.store && $store.state.store.id,
      }"
      :update="(data) => data.order"
      fetchPolicy="no-cache"
    >
      <template v-slot="{ result: { error, data }, isLoading }">
        <div v-if="isLoading">Loading........</div>
        <ErrComponent v-else-if="error" :error="error" />
        <div class="flex flex-col text-center" v-else-if="data">
          <div
            class="text-center text-sm text-black bg-white w-full py-5 tracking-widest"
          >
            <p class="font-semibold">Order {{ data.orderNo }}</p>
            <Span class="flex flex-wrap justify-center text-gray-600 text-xs">
              Placed on {{ data.createdAt | date }}
              <li class="list-disc ml-2">
                {{ data.amount.total | currency(settings.currency_symbol) }} for
                1 item
              </li>
            </Span>
          </div>
          <div
            class="border border-green-500 rounded mx-2 my-4 text-gray-700 text-sm font-semibold text-black-400"
          >
            <div class="flex flex-col text-xs justify-between mt-1 my-2">
              <div>
                <span class="text-semibold text-xs">PAYMENT MODE</span>
                <span class="text-xl">
                  {{ data.payment.method || 'online' }}</span
                >
              </div>
              <div>
                Amount:
                <span class="text-2xl">
                  {{ data.amount.total | currency(settings.currency_symbol) }}
                </span>
              </div>
            </div>
          </div>
          <div class="mx-2 py-4 rounded text-white text-center leading-tight">
            <div
              v-if="data.payment.method == 'COD'"
              class="bg-blue-500 shadow-lg px-4 rounded"
            >
              Payment method selected was COD during the order.<br />
              Please pay
              <span class="text-2xl">
                {{ data.amount.total | currency(settings.currency_symbol) }}
              </span>
              to the delivery agent
            </div>
            <div
              v-else-if="data.payment.amount_due > 0"
              class="primary shadow-lg px-4 py-4 rounded"
            >
              Online payment was failed. Please pay
              <span class="text-2xl">
                {{
                  (data.payment.amount_due / 100)
                    | currency(settings.currency_symbol)
                }}
              </span>
              to the delivery agent.
            </div>
            <div v-else class="bg-red-500 rounded shadow-lg px-4 py-4 rounded">
              Online payment was failed. Please pay
              <span class="text-2xl">
                {{ data.amount.total | currency(settings.currency_symbol) }}
              </span>
              to the delivery agent
            </div>
          </div>
          <div class="m-3 rounded border shadow">
            <div class="bg-gray-100 px-3 py-2">
              <div class="text-left font-bold">
                {{ data.address.firstName }} {{ data.address.lastName }}
              </div>
              <div class="flex">
                <MapPinIcon class="h-4 w-4 my-1 mr-1" />
                <div class="text-left text-gray-500 font-medium text-sm">
                  {{ data.address.address }}, {{ data.address.city }},
                  {{ data.address.state }} -
                  {{ data.address.zip }}
                </div>
              </div>
            </div>
            <nuxt-link
              :to="'/' + i.slug"
              class="flex bg-white my-2 border-b"
              v-for="i in data.items"
              :key="i.id"
            >
              <img v-lazy="i.img" class="w-24 mr-2" />
              <div class="flex flex-col p-2">
                <div class="font-bold">{{ i.name }}</div>
                <div class="flex justify-between">
                  <div class="text-sm text-gray-500 mr-2">
                    {{ i.vendor_name }}
                  </div>
                  <div class="text-xl text-gray-800">
                    {{ i.price | currency(settings.currency_symbol) }} *
                    {{ i.qty }}
                  </div>
                </div>
                <div class="text-xs text-gray-800">Status: {{ i.status }}</div>
              </div>
            </nuxt-link>
            <nuxt-link
              to="/search/"
              class="block border-b text-red-600 font-semibold text-sm bg-white p-2 text-left rounded"
              >Add more items +</nuxt-link
            >
          </div>
          <div class="bg-white p-3 text-base">
            <div class="price-breakup">
              <div>Subtotal</div>
              <div>
                {{ data.amount.subtotal | currency(settings.currency_symbol) }}
              </div>
            </div>
            <div class="price-breakup">
              <div>Tax & fees</div>
              <div>
                {{ data.amount.tax.cgst | currency(settings.currency_symbol) }}
                +
                {{ data.amount.tax.sgst | currency(settings.currency_symbol) }}
              </div>
            </div>
            <div class="price-breakup" v-if="data.amount.discount">
              <div>Discount</div>
              <div>
                {{ data.amount.discount | currency(settings.currency_symbol) }}
              </div>
            </div>
            <div class="price-breakup">
              <div>Delivery</div>
              <div>
                {{ data.amount.shipping | currency(settings.currency_symbol) }}
              </div>
            </div>
            <hr />
            <div class="price-breakup font-bold">
              <div>Total</div>
              <div class="text-xl font-bold">
                {{ data.amount.total | currency(settings.currency_symbol) }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { HeadingFlat } from '~/shared/components'
import { MapPinIcon } from 'vue-feather-icons'

export default {
  middleware: ['isAuth'],
  computed: { ...mapGetters({ settings: 'settings' }) },
  data() {
    return {
      order: null,
    }
  },
  components: {
    MapPinIcon,
    HeadingFlat,
  },
  layout: 'account',
}
</script>
