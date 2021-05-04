<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen pb-20 mx-8 text-lg antialiased"
  >
    <div
      class="mask"
      v-if="$store.state.settings && $store.state.settings.closed"
    >
      <h1 class="p-8 text-xl text-red-500 bg-gray-900">
        {{ $store.state.settings.closedMessage }}
      </h1>
    </div>
    <!-- <Loading /> -->
    <Error />
    <h1 v-if="error.statusCode === 404">Not found</h1>
    <pre v-else>{{ error }}</pre>
    &nbsp;
    <nuxt-link to="/" class="px-4 text-2xl rounded primary"
      >Back to Home</nuxt-link
    >
  </div>
</template>

<script>
import Vue from 'vue'
import { Loading } from '~/shared/components/ui'
import { Error } from '~/shared/components'
export default {
  props: ['error'],
  components: { Error, Loading },
  created() {
    this.$store.commit('busy', false)
  },
}
</script>
