<template>
  <div
    class="container w-full px-2 mx-auto mt-4 lg:w-2/4 lg:mt-10 lg:pr-20 xs:w-full lg:px-10 headings"
  >
    <div class="text-2xl font-bold text-center">Manage Address</div>
    <div class="w-full my-4">
      <nuxt-link
        :to="`address/add`"
        class="flex items-center justify-center w-full p-5 mb-5 text-center bg-white border border-gray-100 rounded shadow hover:shadow-xl"
      >
        <PlusIcon class="w-10 mr-1" />ADD NEW ADDRESS
      </nuxt-link>
      <ApolloQuery
        :query="require('~/gql/address/myAddresses.gql')"
        :variables="{ store: $store.state.store && $store.state.store.id }"
      >
        <template v-slot="{ result: { error, data }, isLoading }">
          <div v-if="isLoading">Loading...</div>
          <ErrComponent v-else-if="error" :error="error" />
          <div v-else-if="data && data.addresses">
            <div
              class="relative flex flex-wrap w-full px-5 py-3 mb-5 bg-white border border-gray-100 rounded shadow hover:shadow-xl"
              v-for="a in data.addresses.data"
              :key="a.id"
            >
              <nuxt-link
                :to="`address/${a.id}`"
                class="absolute right-0 px-2 mr-2 text-xs text-right border border-gray-300 rounded"
                >Edit</nuxt-link
              >
              <div class="w-full py-2 text-sm leading-loose">
                <p>
                  <b>{{ a.firstName }} {{ a.lastName }}</b>
                </p>
                <div class="w-full py-2 text-sm leading-loose">
                  <p>{{ a.phone }}</p>
                  <p>{{ a.address }}</p>
                  <p>{{ a.city }}</p>
                  <p>
                    {{ a.state }}-
                    <span class="font-bold">{{ a.zip }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </ApolloQuery>
    </div>
  </div>
</template>
<script>
// import addresses from '~/gql/address/myAddresses.gql'
import deleteAddress from '~/gql/address/deleteAddress.gql'
import Heading from './Heading'
import ListSkeleton from './ui/ListSkeleton'
import { PlusIcon } from 'vue-feather-icons'

export default {
  layout: 'account',
  middleware: ['isAuth'],
  components: { Heading, ListSkeleton, PlusIcon },
  methods: {
    async del(address) {
      this.$swal({
        title: 'Do you wish to delete this address?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete!',
      }).then(async (result) => {
        if (result.value) {
          this.$store.commit('clearErr')
          await this.$apollo.mutate({
            mutation: gql`
              mutation deleteAddress($id: ID!) {
                deleteAddress(id: $id)
              }
            `,
            variables: { id: address.id },
          })
          this.getAddresses()
        }
      })
    },
  },
}
</script>
