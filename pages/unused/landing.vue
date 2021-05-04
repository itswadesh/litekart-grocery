<template>
  <div>
    <div
      class="relative flex justify-center w-full overflow-hidden mid rlative"
    >
      <video
        class="object-cover w-full h-full"
        :src="'/video.mp4'"
        autoplay
        loop
        muted
      />
      <button
        @click="saveLanding()"
        class="absolute bottom-0 px-8 py-4 mt-20 text-center text-black bg-white rounded-t-lg shadow-lg hover:bg-gray-200 hover:text-primary-500"
      >
        Enter Site
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async saveLanding(c) {
      this.$cookies.set('landing', 'ok', { path: '/' })
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.mid {
  height: 70vh;
}
</style>
