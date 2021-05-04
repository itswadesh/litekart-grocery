<template>
  <div class="antialiased min-h-screen">
    <div
      class="mask"
      v-if="$store.state.settings && $store.state.settings.closed"
    >
      <h1 class="text-red-500 text-xl bg-gray-900 p-8">
        {{ $store.state.settings.closedMessage }}
      </h1>
    </div>
    <nuxt />
  </div>
</template>

<script>
import { Loading } from '~/shared/components/ui'
export default {
  components: { Loading },
}
</script>
