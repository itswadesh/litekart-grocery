<template>
  <div>
    <div class="container sticky top-0 z-10 max-w-full mx-auto bg-white">
      <div
        style="height: 43px"
        class="flex flex-row justify-between p-2 px-3 text-sm shadow"
      >
        <div class="my-auto text-base font-light text-gray-500 capitalize">
          <b> {{ count }} </b> products found
        </div>
        <div class="flex flex-row my-auto">
          <div
            @click="showMobileSort = !showMobileSort"
            class="flex flex-row mx-auto overflow-x-hidden overflow-y-hidden transition ease-in-out cursor-pointer me-4 focus:outline-none duration-1500"
          >
            <svg
              class="me-1 text-primary-500"
              width="14"
              height="18"
              viewBox="0 0 14 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 0L0 3.99H3V11H5V3.99H8L4 0ZM11 14.01V7H9V14.01H6L10 18L14 14.01H11Z"
                fill="#BB8738"
              />
            </svg>
          </div>
          <div
            @click="showMobileFilter = !showMobileFilter"
            class="flex flex-row mx-auto overflow-x-hidden overflow-y-hidden transition ease-in-out cursor-pointer focus:outline-none duration-1500"
          >
            <svg
              class="me-1 text-primary-500"
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 12H11V10H7V12ZM0 0V2H18V0H0ZM3 7H15V5H3V7Z"
                fill="#BB8738"
              />
            </svg>
          </div>
        </div>
      </div>
      <SortSlideUp
        v-if="!!showMobileSort"
        @hideSort="showMobileSort = false"
        class="fixed"
      />
    </div>
    <div
      class="py-2\1 bg-white-800 shadow h-full bg-white top-0 z-50 fixed w-full filters-demo"
      v-if="facets && showMobileFilter"
    >
      <div
        class="block h-full cursor-pointer sm:hidden focus:outline-none"
        v-if="showMobileFilter"
      >
        <div
          class="flex w-full px-4 py-4 text-base font-light text-gray-600 bg-white shadow-md"
        >
          <div class="flex-1 text-left" @click="hideFilter">
            CLOSE
            <i class="ms-2 fa fa-times" aria-hidden="true"></i>
          </div>
          <div class="flex-1 font-medium text-center text-primary-500">
            FILTER
          </div>
          <button
            class="flex-1 text-right focus:outline-none"
            @click="clearAll"
          >
            Clear all
          </button>
        </div>
        <div class="flex w-full h-full mt-10">
          <div class="w-2/5">
            <ul class="h-full bg-gray-200">
              <li
                v-if="
                  facets.brands &&
                  facets.brands &&
                  facets.brands.all.buckets &&
                  facets.brands.all.buckets.length > 0
                "
                class="p-2 text-base font-normal text-gray-500"
                :class="{
                  'bg-white text-primary-500 border-l-4 border-primary-500':
                    selected == 'brands',
                }"
                @click="selected = 'brands'"
              >
                Brands
              </li>
              <li
                v-if="
                  facets.sizes &&
                  facets.sizes &&
                  facets.sizes.all.buckets &&
                  facets.sizes.all.buckets.length > 0
                "
                class="p-2 text-base font-normal text-gray-500"
                :class="{
                  'bg-white text-primary-500 border-l-4 border-primary-500':
                    selected == 'sizes',
                }"
                @click="selected = 'sizes'"
              >
                Sizes
              </li>
              <li
                v-if="
                  facets.colors &&
                  facets.colors &&
                  facets.colors.all.buckets &&
                  facets.colors.all.buckets.length > 0
                "
                class="p-2 text-base font-normal text-gray-500"
                :class="{
                  'bg-white text-primary-500 border-l-4 border-primary-500':
                    selected == 'colors',
                }"
                @click="selected = 'colors'"
              >
                Color
              </li>
              <li
                class="p-2 text-base font-normal text-gray-500"
                :class="{
                  'bg-white text-primary-500 border-l-4 border-primary-500':
                    selected == 'Price',
                }"
                @click="selected = 'Price'"
              >
                Price
              </li>
              <li
                class="p-2 text-base font-normal text-gray-500"
                :class="{
                  'bg-white text-primary-500 border-l-4 border-primary-500':
                    selected == 'Gender',
                }"
                @click="selected = 'Gender'"
              >
                Gender
              </li>
            </ul>
          </div>
          <div class="w-full overflow-y-auto">
            <!-- <ul
            class="w-full px-5 py-2 ms-2"
            v-if="selected == 'categories' && facets.categories && facets.categories.all && facets.categories.all.buckets"
          >
            <li
              v-for="b in facets.categories && facets.categories.all && facets.categories.all.buckets"
              :key="b.key"
            >
              <Checkbox
                :count="b.doc_count"
                :value="b.key"
                v-model="fl.categories"
                @change="changed({model:'categories',checked:fl.categories})"
              >{{b.key}}</Checkbox>
            </li>
          </ul> -->
            <ul
              class="w-full px-5 py-2 pb-28 ms-2"
              v-if="
                selected == 'brands' &&
                facets.brands &&
                facets.brands.all &&
                facets.brands.all.buckets
              "
            >
              <li
                class="py-1"
                v-for="b in facets.brands &&
                facets.brands.all &&
                facets.brands.all.buckets"
                :key="b.key"
              >
                <Checkbox
                  :count="b.doc_count"
                  :value="b.key"
                  v-model="fl.brands"
                  @change="changed({ model: 'brands', checked: fl.brands })"
                >
                  {{ b.key }}
                </Checkbox>
              </li>
            </ul>
            <ul
              class="w-full px-5 py-2 ms-2"
              v-if="
                selected == 'sizes' &&
                facets.sizes &&
                facets.sizes.all.buckets &&
                facets.sizes.all.buckets.length > 0
              "
            >
              <li
                v-for="b in facets.sizes &&
                facets.sizes.all &&
                facets.sizes.all.buckets"
                :key="b.key"
              >
                <Checkbox
                  :count="b.doc_count"
                  :value="b.key"
                  v-model="fl.sizes"
                  @change="changed({ model: 'sizes', checked: fl.sizes })"
                  >{{ b.key }}</Checkbox
                >
              </li>
            </ul>
            <ul
              class="w-full px-5 py-2 ms-2"
              v-if="
                selected == 'colors' &&
                facets.colors &&
                facets.colors.all &&
                facets.colors.all.buckets &&
                facets.colors.all.buckets.length > 0
              "
            >
              <li
                v-for="b in facets.colors &&
                facets.colors.all &&
                facets.colors.all.buckets"
                :key="b.key"
              >
                <Checkbox
                  :count="b.doc_count"
                  :value="b.key"
                  v-model="fl.colors"
                  @change="changed({ model: 'colors', checked: fl.colors })"
                  >{{ b.key }}</Checkbox
                >
              </li>
            </ul>
          </div>
        </div>
        <div
          class="fixed inset-x-0 bottom-0 z-10 flex flex-row p-1 bg-white border shadow"
        >
          <!-- <button
            @click="hideFilter"
            class="w-1/3 h-12 p-1 tracking-wider text-gray-700 bg-gray-300 rounded me-3 focus:outline-none text-medium"
          >
            CLOSE
          </button> -->
          <Button
            @click="hideFilter"
            class="w-full h-12 p-1 text-xl font-light tracking-wider text-white rounded hover:bg-accent-500 focus:outline-none bg-primary-500 text-medium"
          >
            APPLY
          </Button>
        </div>
        <!-- <div class="absolute bottom-0 w-full text-center primary">
        <button class="w-full p-3 font-bold text-white shadow-md cursor-pointer hover:bg-yellow-600 bg-primary-500 focus:outline-none">APPLY</button>
      </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { Checkbox, Radio, Button } from '~/shared/components/ui'
import SortSlideUp from '~/components/Listing/Mobile/SortSlideUp'
import { constructURL } from '~/lib/'

export default {
  props: {
    count: {
      type: Number,
    },
    clear: Boolean,
    fl: {
      type: [Object, Array],
    },
    facets: {
      type: [Object, Array],
      default: () => {
        return {}
      },
    },
  },
  components: { Checkbox, Radio, SortSlideUp, Button },
  created() {
    // console.log(this.facets)
  },
  data() {
    return {
      isFilter: false,
      selected: 'brands',
      loadingPrice: true, // Required because after loading finished then only we will initiate the price slider component
      showMobileFilter: false,
      showMobileSort: false,
    }
  },
  methods: {
    hideFilter(e) {
      this.showMobileFilter = false
      // this.$emit('hide', true)
    },
    Changed(i) {
      console.error('categoryChanged', i)
    },
    changed(e) {
      this.fl[e.model] = e.checked
      // this.fl.pilot = e.checked;
      let url = constructURL('/search', this.fl)
      this.$router.push(url)
    },
    checkCategory() {},
    go(slug) {
      this.$router.push('/' + slug)
    },
    clearAll() {
      this.$router.push(`/search`)
      this.$emit('hide')
    },
  },
}
</script>
