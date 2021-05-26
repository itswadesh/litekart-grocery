<template>
  <button
    type="submit"
    :loading="loading"
    class="flex items-center justify-center px-4 py-2 space-x-1 font-semibold tracking-wider text-white transition duration-300 transform bg-white rounded-md shadow-md hover:shadow gradient focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 active:scale-95"
  >
    <!-- <img
        src="/loading.svg"
        :class="{ loading: loading }"
        alt
      />-->
    <!-- <div v-if="loading">
      <img src="/loading.svg" alt="" class="justify-center h-6" />
    </div> -->
    <!-- v-else -->
    <slot />
  </button>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({ loading: "loading" }),
  },
};
</script>

<style scoped>
.gradient {
  position: relative;
  background-image: linear-gradient(87deg, #2ddb24, #23af1c);
  z-index: 1;
}

.gradient::before {
  position: absolute;
  content: "";
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 0.375rem /* 6px */;
  background-image: linear-gradient(87deg, #23af1c, #2ddb24);
  z-index: -1;
  transition: opacity 0.3s linear;
  opacity: 0;
}

.gradient:hover::before {
  opacity: 1;
}
</style>
