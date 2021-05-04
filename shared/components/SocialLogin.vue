<template>
  <div class="flex text-center justify-center my-8">
    <a
      @click="loadingGoogle = true"
      href="/auth/google"
      class="flex py-2 px-4 bg-gray-100 rounded-lg shadow mr-2"
      :class="{
        'border border-gray-400 bg-gray-300': loadingGoogle,
      }"
    >
      <img
        v-if="loadingGoogle"
        class="mr-4 w-6 h-6 rounded-full"
        src="/loading.svg"
        alt="google"
      />
      <img
        v-else
        class="mr-4 w-6 h-6 rounded-full"
        src="/google.svg"
        alt="google"
      />
      <span>Google</span>
    </a>
    <a
      @click="loadingFacebook = true"
      href="/auth/facebook"
      class="flex py-2 px-4 bg-gray-100 rounded-lg shadow"
      :class="{
        'border border-gray-400 bg-gray-300': loadingFacebook,
      }"
    >
      <img
        v-if="loadingFacebook"
        class="mr-4 w-6 h-6 rounded-full"
        src="/loading.svg"
        alt="google"
      />
      <img
        v-else
        class="mr-4 w-6 h-6 rounded-full"
        src="/facebook.svg"
        alt="facebook"
      />
      <span>Facebook</span>
    </a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loadingGoogle: false,
      loadingFacebook: false,
    }
  },
}
</script>
<style scoped>
a:hover {
  transform: scale(0.97, 0.97);
}
</style>
