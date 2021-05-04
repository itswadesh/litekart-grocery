<template>
  <div class="h-full text-center">
    <img class="w-full h-84 object-cover" src="/onboarding.jpg" alt />
    <h1 class="text-2xl font-bold mt-6 mx-6 leading-tight">
      Order from grocery stores near you
    </h1>
    <div class="text-gray-600">Ready to see available products to order?</div>
    <nuxt-link
      to="/change-location"
      class="inline-block mt-4 py-3 px-6 primary uppercase rounded shadow-lg"
      >SETUP YOUR LOCATION</nuxt-link
    >
  </div>
</template>

<script scoped>
export default {
  layout: 'none',
}
</script>

<style scoped>
.h-50 {
  height: 50%;
}
</style>
