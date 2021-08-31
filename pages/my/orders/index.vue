<template>
  <div class="flex-wrap container mx-auto w-full lg:w-1/2 mb-20">
    <HeadingFlat class="noprint">Manage Orders</HeadingFlat>
    <ApolloQuery
      :query="require('~/gql/order/orders.gql')"
      :variables="{
        id: $route.query.id,
        store: $store.state.store && $store.state.store.id,
      }"
    >
      <template v-slot="{ result: { error, data }, isLoading }">
        <ListCardSkeleton v-if="isLoading">Loading........</ListCardSkeleton>
        <ErrComponent v-else-if="error" :error="error" />
        <div v-else-if="data && data.orders">
          <div
            class="noprint text-center w-full mt-6 py-1 rounded"
            v-if="data.orders.count < 1"
          >
            No order yet
          </div>
          <nuxt-link
            :to="`/my/orders/${o.id}`"
            v-for="o in data.orders.data"
            :key="o.id"
            class="relative mx-2 block w-full bg-white shadow-lg rounded hover:shadow-xl my-4"
          >
            <div v-if="o.payment && o.payment.method !== 'COD'">
              <img
                v-if="o.payment && o.payment.amount == o.payment.amount_paid"
                class="absolute w-20 right-0"
                src="/payment-success.png"
                alt=""
              />
              <img
                v-else
                class="absolute w-20 right-0"
                src="/payment-failed.png"
                alt=""
              />
            </div>
            <div class="rounded p-3">
              <h1>
                Order # <span class="font-bold">{{ o.orderNo }}</span>
              </h1>
              <p class="text-gray-800">
                Date:
                <span class="text-xs">{{ o.createdAt | date }}</span>
              </p>
              <div>
                Total:
                {{ o.amount.total | currency(settings.currency_symbol) }}
              </div>

              <nuxt-link
                v-if="o.items[0].status != 'Delivered'"
                class="inline-block my-2 px-4 py-2 shadow rounded bg-green-500 text-white"
                :to="`/success?id=${o.id}`"
              >
                <span class="mr-4">Live Order</span>
                <span class="pulse w-4 h-4 white"></span>
              </nuxt-link>

              <nuxt-link
                v-else
                class="inline-block my-2 px-4 py-2 shadow rounded"
                :to="`/success?id=${o.id}`"
              >
                <span class="mr-4">Track Order</span>
              </nuxt-link>
            </div>
            <hr />
            <div
              v-for="(i, ix) in o.items"
              :key="i.id"
              class="flex flex-wrap p-3 justify-between"
              :class="{ 'border-t': ix != 0 }"
            >
              <div class="flex items-center">
                <div>
                  <img
                    v-lazy="i.img"
                    class="rounded-full bg-blue-500 mr-2 w-12 h-12"
                    alt
                  />
                </div>
                <div>
                  <div class="text-sm font-semibold">{{ i.name }}</div>
                  <div class="text-gray-500 text-xs">
                    {{ i.qty }} *
                    {{ i.price | currency(settings.currency_symbol) }} =
                    {{ (i.qty * i.price) | currency(settings.currency_symbol) }}
                  </div>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ListCardSkeleton, HeadingFlat } from '~/shared/components'
export default {
  components: { ListCardSkeleton, HeadingFlat },
  layout: 'account',
  middleware: ['isAuth'],
  computed: { ...mapGetters({ settings: 'settings' }) },
}
</script>
