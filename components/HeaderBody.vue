<template>
  <div class="w-full sm:mt-12 lg:mt-4">
    <div
      class="items-center justify-between flex-none hidden w-full text-sm lg:flex"
    >
      <div class="flex flex-row my-auto text-sm font-thin">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-gray-500 cursor-pointer me-1 hover:text-primary-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
          />
        </svg>
        >
        <span
          span
          v-if="category && category.name"
          class="capitalize cursor-pointer ms-1 hover:text-primary-500"
        >
          {{ category.name }}
        </span>
        <span
          v-else
          class="capitalize cursor-pointer ms-1 hover:text-primary-500"
          >{{ $route.params.q }}</span
        >
      </div>

      <div class="flex p-1 my-auto font-semibold">
        <div class="text-base font-hairline font-light text-gray-500 text-1">
          <b> {{ count }} </b>items found
          <span v-if="category && category.name"
            >under <b> {{ category.name }} </b></span
          >
          <span v-else>for {{ $route.params.q }}</span>
        </div>
      </div>
      <div class="flex-wrap p-1 mt-1">
        <div class="text-sm">
          <div class="relative flex flex-row">
            <span class="my-auto text-base font-light text-gray-500 me-2"
              >SORT BY</span
            >
            <select
              class="text-base font-light border-none rounded text-accent-600 focus:ring-accent-600 hover:shadow focus:outline-none"
              v-model="sortBy"
              @change="sort"
            >
              <option
                class="bg-transparent text-start"
                v-for="(s, ix) in sorts"
                :key="ix"
                :value="s.val"
                v-if="s"
              >
                {{ s.name }}
              </option>
            </select>
            <div
              class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-accent-800"
            >
              <i class="px-1 fa fa-caret-down" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex-row justify-between hidden w-full mb-2 sm:flex sm:px-4 xs:block lg:hidden"
    >
      <div
        class="flex items-center text-base font-light text-gray-500 rounded pe-5 text-start hover:bg-gray-200"
        @click="$emit('showFilters')"
      >
        Filter
      </div>

      <div
        class="flex-1 hidden px-4 my-auto text-base font-light text-center text-gray-500 md:block"
      >
        <b> {{ count }} </b>Items
      </div>
      <div class="items-center text-center text-gray-700 text-primary">
        <select
          class="text-sm font-light border-none rounded text-accent-600 focus:ring-accent-600 hover:shadow focus:outline-none"
          v-model="sortBy"
          @change="sort"
        >
          <option
            class="bg-white"
            v-for="(s, ix) in sorts"
            :key="ix"
            :value="s.val"
          >
            {{ s.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { Checkbox } from '~/shared/components/ui'
import { constructURL } from '~/lib/'
import { sorts } from '~/shared/config'
export default {
  components: { Checkbox },
  data() {
    return {
      sorts,
      sortBy: null,
    }
  },
  async created() {
    // await this.getSortOptions()
    this.sortBy = this.$route.query.sort || '-createdAt'
  },
  props: {
    category: {
      type: Object,
    },
    count: {
      type: Number,
    },
    fl: {
      type: [Object, Array],
    },
  },
  methods: {
    async getSortOptions() {
      try {
        this.loading = true
        this.sorts = (
          await this.$apollo.query({
            query: SORTS,
            fetchPolicy: 'no-cache',
          })
        ).data.sorts
      } catch (e) {
      } finally {
        this.isLoading = false
      }
    },
    sort() {
      // // let url = new URL(window.location.host + this.$route.fullPath)
      // // let params = new URLSearchParams(url.search)

      // // // //Add a third parameter.
      // // params.set('sort', this.sortBy)
      // // // params.toString() // "foo=1&bar=2&baz=3"
      // // console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz', params.toString())
      // // let fl = { ...this.fl }
      // // fl.sort = this.sortBy
      // this.$route.query.sort = this.sortBy
      // let url = constructURL('/c', this.$route.query)
      // const path = '/c/' + this.$route.params.slug + url
      // console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz', path)
      // this.$router.push(path)
      let fl = { ...this.fl }
      fl.sort = this.sortBy
      let url = constructURL('/search', fl)
      this.$router.push(url)
    },
    remove(k, i) {
      let ix = this.fl[k].indexOf(i)
      this.fl[k].splice(ix, 1)
      // this.$emit("removed", this.fl);
      let url = constructURL('/search', this.fl)
      this.$router.push(url)
    },
  },
}
</script>
