<template>
  <div>
    <div class="absolute z-20 px-1 my-auto mt-4">
      <nuxt-link :to="localePath('/')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 h-6 my-auto text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </nuxt-link>
    </div>
    <div class="absolute w-full">
      <div class="w-full">
        <div class="z-50 flex flex-col justify-center w-full">
          <div class="flex flex-wrap">
            <!--  Input anv Value method used for handling keyup in mobile -->
            <form
              autocomplete="off"
              @submit.prevent="submit"
              class="flex flex-row w-full"
            >
              <input
                autofocus
                :placeholder="
                  (settings && settings.searchbar_text) ||
                  'Search for products, brands...'
                "
                ref="q"
                @input="getData"
                :value="q"
                class="relative w-full p-2 pl-10 font-light truncate shadow h-14 text-normal focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <div class="flex justify-end h-full cursor-pointer">
                <svg
                  v-if="q"
                  @click="resetInput"
                  class="absolute flex justify-end w-6 h-6 my-auto mt-4 text-sm text-gray-500 me-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-else
                  class="absolute flex justify-end w-6 h-6 my-auto mt-4 text-sm text-gray-500 me-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </form>
            <div
              class="w-full mt-1 overflow-auto bg-white border-gray-400 rounded shadow"
            >
              <div
                v-for="(v, i) in products"
                :key="i"
                @click="onselect(v)"
                class="flex flex-row items-center justify-between w-full text-base font-light text-gray-500 border-b cursor-pointer hover:bg-gray-100"
              >
                <div class="flex flex-row w-10/12">
                  <img
                    v-lazy="v._source.img"
                    :key="v._id"
                    alt=""
                    class="object-contain w-12 h-10 mx-2 my-auto"
                  />
                  <span class="p-3 truncate">{{ v._source.name }}</span>
                </div>
                <svg
                  class="mx-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                >
                  <g fill="none" fill-rule="evenodd">
                    <path d="M0 0h24v24H0z" />
                    <path
                      fill="#000"
                      fill-opacity=".54"
                      fill-rule="nonzero"
                      d="M16.631 19.015l1.384-1.45-9.55-9.62h6.59v-2h-10v10h2v-6.59z"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-auto p-3 mt-16 bg-white border-t border-b shadow">
      <span class="text-sm font-light text-gray-600">Discover More</span>
      <div class="grid grid-cols-4 mt-2">
        <nuxt-link
          :to="`/search/${d.d}`"
          v-for="d in discover"
          :key="d.id"
          class="w-auto h-auto p-1 m-1 text-sm font-light text-center truncate bg-white shadow hover:bg-gray-100 text-primary-500"
        >
          <span>{{ d.d }}</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'none',
  data() {
    return {
      discover: [
        { d: 'Mobile' },
        { d: 'shoes' },
        { d: 't shirt' },
        { d: 'laptop' },
        { d: 'watches' },
        { d: 'toys' },
        { d: 'pants' },
        { d: 'heaphones' },
        { d: 'bluetooth' },
        { d: 'speaker' },
      ],
      products: null,
      q: '',
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
  },
  methods: {
    submit() {
      if (this.product)
        this.$router.push(
          `/${this.product._source.slug}?id=${this.product._id}`
        )
      else this.$router.push(`/search/${this.q}`)
    },
    async onselect(product) {
      if (product)
        this.$router.push(`/${product._source.slug}?id=${product._id}`)
    },
    async fillValue(val) {
      this.product = val
    },
    async getData(e) {
      if (e.isComposing) {
        if (e.target.value === '') {
          this.q = this.query.slice(0, -1)
        } else {
          this.q = e.target.value
        }
      } else {
        this.q = e.target.value
      }
      // if (this.q == null || this.q == '') return
      try {
        const result = await this.$axios.$get('/api/products/autocomplete', {
          params: { q: this.q },
        })
        // console.log(result)
        this.products = result.data
      } catch (e) {
        // console.log(e)
      } finally {
      }
    },
    resetInput() {
      this.q = ''
      this.$refs.q.focus()
    },
    mounted() {
      this.$refs.q.focus()
    },
  },
}
</script>
