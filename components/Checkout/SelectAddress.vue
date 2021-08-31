<template>
  <div class="p-2 bg-white rounded shadow">
    <ApolloQuery
      :query="require('~/gql/address/myAddresses.gql')"
      :variables="{ store: $store.state.store && $store.state.store.id }"
    >
      <template v-slot="{ result: { error, data }, isLoading }">
        <div v-if="isLoading">Loading........</div>
        <div v-else-if="error">
          <ErrComponent />
        </div>
        <div v-else-if="data && data.addresses.length > 0">
          <div
            class="flex justify-between"
            v-for="(a, ix) in data.addresses"
            :key="a._id"
          >
            <label class="flex justify-between w-full cursor-pointer">
              <div>
                <Radio />
              </div>
              <div class="flex-1 ml-2">
                <div class="font-semibold">
                  {{ a.firstName }} {{ a.lastName }}
                  <span v-if="ix == 0">(Default)</span>
                </div>
                <div class="py-2 text-xs">
                  <div>{{ a.address }}</div>
                  <div>{{ a.city }}</div>
                  <div>{{ a.zip }}</div>
                  <div>{{ a.state }}</div>
                  <div class="py-2">
                    Mobile:
                    <span class="font-bold">{{ a.phone }}</span>
                  </div>
                </div>
              </div>
              <div v-if="office">
                <div class="px-2 py-1 text-xs bg-gray-200 rounded-full">
                  OFFICE
                </div>
              </div>
            </label>
            <label class="flex w-full border-t border-gray-200">
              <button
                @click="go('/checkout/address')"
                class="w-1/2 py-1 mt-1 tracking-widest text-blue-500 border-r border-gray-200"
              >
                Edit/Change
              </button>
              <button
                @click="go('/checkout/add')"
                class="w-1/2 py-1 mt-1 tracking-widest text-blue-500"
              >
                Add New Address
              </button>
            </label>
          </div>
        </div>
        <div v-else>Add new address</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
// import Vue from 'vue'
import { Radio } from '~/shared/components/ui'
import addresses from '~/gql/address/myAddresses.gql'

export default {
  components: { Radio },
  data() {
    return {
      office: false,
      // addresses: []
    }
  },
  created() {
    // this.getAddress()
  },
  methods: {
    // async getAddress() {
    //   try {
    //     this.$store.commit('clearErr')
    //     const a = (
    //       await this.$apollo.query({
    //         query: addresses
    //         // fetchPolicy: 'no-cache'
    //       })
    //     ).data.addresses
    //     this.addresses = a.data
    //   } catch (e) {
    //     this.$store.commit('setErr', e)
    //   } finally {
    //     this.$store.commit('busy', false)
    //   }
    // },
    go(url) {
      this.$router.push(url)
    },
  },
}
</script>

<style scoped></style>
