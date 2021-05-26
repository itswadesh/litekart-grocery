<template>
  <div class="flex items-center justify-center space-x-2 md:space-x-5">
    <div class="w-1/2">
      <a
        @click="loadingGoogle = true"
        href="/auth/google"
        class="flex items-center justify-center w-32 py-2 ml-auto space-x-2 transition duration-300 transform bg-gray-100 rounded shadow-md active:scale-90 hover:shadow"
        :class="{
          'border border-gray-400 bg-gray-300': loadingGoogle,
        }"
      >
        <img
          v-if="loadingGoogle"
          class="w-6 h-6 rounded-full"
          src="/loading.svg"
          alt="google"
        />
        <img
          v-else
          class="w-6 h-6 rounded-full"
          src="/google.svg"
          alt="google"
        />
        <span>Google</span>
      </a>
    </div>
    <div class="w-1/2">
      <a
        @click="loadingFacebook = true"
        href="/auth/facebook"
        class="flex items-center justify-center w-32 py-2 mr-auto space-x-2 transition duration-300 transform bg-gray-100 rounded shadow-md active:scale-90 hover:shadow"
        :class="{
          'border border-gray-400 bg-gray-300': loadingFacebook,
        }"
      >
        <img
          v-if="loadingFacebook"
          class="w-6 h-6 rounded-full"
          src="/loading.svg"
          alt="google"
        />
        <img
          v-else
          class="w-6 h-6 rounded-full"
          src="/facebook.svg"
          alt="facebook"
        />
        <span>Facebook</span>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loadingGoogle: false,
      loadingFacebook: false,
    };
  },
};
</script>
<style scoped></style>
