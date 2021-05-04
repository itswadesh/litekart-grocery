<template>
  <div>
    <button
      type="submit"
      :disabled="loading"
      class="flex items-center justify-center outline-none px-5 py-2 w-full rounded"
      :class="{
        'primary text-white': !loading,
        'border border-gray-400 bg-gray-300': loading,
      }"
    >
      <!-- <img
        src="/loading.svg"
        :class="{ loading: loading }"
        alt
      />-->
      <span v-if="loading">&nbsp;</span>
      <slot v-else />
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({ loading: 'loading' }),
  },
}
</script>

<style></style>
