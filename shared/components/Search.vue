<template>
  <form novalidate autocomplete="off" @submit.stop.prevent="submit(search)">
    <div class="search_fix"></div>
    <div class="absolute">
      <SearchIcon size="16" class="m-3 text-gray-500" />
    </div>
    <input
      type="text"
      v-model="search"
      class="w-full px-10 bg-purple-white pr-4 shadow rounded-b-sm border-0 h-10 focus:outline-none text-xs text-2"
      placeholder="Search for products, categories and more"
      name="search"
    />
  </form>
</template>

<script>
import { typingTimeout } from '~/shared/config'
import { SearchIcon } from 'vue-feather-icons'

export default {
  data() {
    return {
      search: '',
    }
  },
  methods: {
    submit(q) {
      this.$router.push(`/search/${q}`)
    },
  },
  components: { SearchIcon },
  watch: {
    search: {
      immediate: false,
      handler(value, oldValue) {
        // if (value.length < 4) return;
        if (!oldValue) return // Do not trigger on page load
        clearTimeout(this.typingTimer)
        let vm = this
        this.typingTimer = setTimeout(function () {
          if (!value || value == 'undefined') value = '' // When clear button clicked
          vm.searchString = value
          vm.$router.push(`/search/${value}`)
        }, typingTimeout)
      },
    },
    '$route.query.q': {
      immediate: true,
      handler(value) {
        let pathName = null
        if (this.$route.name) pathName = this.$route.name.substr(0, 8)
        if (pathName === 'category') return
        if (!value || value == 'undefined') value = ''
        if (value == '') return
        if (this.search == '') this.search = value
      },
    },
  },
}
</script>

<style scoped>
img {
  margin-right: 1rem;
}
</style>
