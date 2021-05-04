<template>
  <button
    class="w-24 h-8 rounded-lg text-sm fixed shadow-lg font-medium top-0 mt-16 text-center z-50"
    @click="toTop"
    v-if="scrolled > 1000"
  >
    Back To Top
    <ArrowUpIcon />
  </button>
</template>

<script>
import { ArrowUpIcon  } from 'vue-feather-icons'
export default {
  name: 'BackToTop',
  data() {
    return {
      shouldShow: false,
      scrolled: 0,
    }
  },
  components: {ArrowUpIcon},
  methods: {
    toTop() {
      if (process.client) {
        window.scrollTo(0, 0)
      }
    },
  },
  mounted() {
    if (process.client) {
      window.addEventListener('scroll', () => {
        this.scrolled = window.scrollY
      })
    }
  },
}
</script>
