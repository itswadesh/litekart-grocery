<template>
  <div
    class="flex-row justify-center w-full p-2 text-sm font-semibold text-center bg-white text-primary-500 -z-2"
  >
    <span>Policy© 2007-2020 {{ settings.websiteName }}</span>
  </div>
</template>
<script>
export default {
  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
  },
}
</script>
