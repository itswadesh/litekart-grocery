<template>
  <div class="w-64 h-full" v-if="facets">
    <div
      class="flex items-center justify-between py-3 text-sm font-bold border-b border-dashed md:px-3 lg:px-4 md:text-xs headings"
    >
      <div class="text-lg font-normal text-gray-600">FILTERS</div>
      <button
        @click="$emit('clearAllFilters')"
        class="text-right cursor-pointer text-primary-500 focus:outline-none hover:text-yellow-600"
      >
        CLEAR ALL
      </button>
    </div>
    <!-- Chips -->
    <div
      v-for="(v, k) in fl"
      :key="k"
      v-if="
        v && v.length > 0 && k != 'page' && k != 'sort' && k != 'categories'
      "
      class="flex flex-wrap items-center my-2 text-xs ms-3 me-2"
    >
      <div
        class="px-2 py-1 bg-gray-200 border rounded border-gray-50"
        v-for="(i, ix) in v"
        :key="ix"
      >
        {{ i }}
        <button
          aria-hidden="true"
          class="hover:bg-white ms-1"
          @click="remove(k, i)"
        >
          <svg
            class="w-3 h-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
    <!-- {{facets.categories.all.buckets[0].key}} == {{facets.categories.all.buckets[0].val.buckets[0].key}}
    <div v-if="facets.categories && facets.categories.all.buckets && facets.categories.all.buckets.length>0">
      <span class="px-2 py-2 text-sm font-semibold ms-2 headings">CATEGORY</span>
      <ul class="px-2 py-2 overflow-auto ms-2 max-h-96">
        <li
          v-for="b in facets.categories && facets.categories.all.buckets"
          :key="b.key"
        >
          <Checkbox
            :count="b.doc_count"
            :value="b.key"
            v-model="fl.categories"
            @change="changed({model:'categories',checked:fl.categories})"
          >{{b.val.buckets[0].key}}</Checkbox>
        </li>
      </ul>
    </div> -->
    <div
      class="pt-2 pb-5 my-3 border-b"
      v-if="
        facets.brands &&
        facets.brands &&
        facets.brands.all.buckets &&
        facets.brands.all.buckets.length > 0
      "
    >
      <h4 class="px-2 text-base font-medium uppercase ms-2">BRAND</h4>
      <ul class="px-2 overflow-auto font-light ms-2 max-h-96">
        <li
          v-for="b in facets.brands &&
          facets.brands.all &&
          facets.brands.all.buckets"
          :key="b.key"
        >
          <Checkbox
            class="flex items-center my-2 tracking-wider"
            color="primary"
            :count="b.doc_count"
            :value="b.key"
            v-model="fl.brands"
            @change="changed({ model: 'brands', checked: fl.brands })"
          >
            <div class="">{{ b.key }}</div>
          </Checkbox>
        </li>
      </ul>
    </div>
    <div
      class="pt-2 pb-5 my-3 border-b"
      v-if="
        facets.colors &&
        facets.colors.all &&
        facets.colors.all.buckets &&
        facets.colors.all.buckets.length > 0
      "
    >
      <h4 class="px-2 text-base font-medium uppercase ms-2">COLOR</h4>
      <ul class="px-2 overflow-auto font-light ms-2 max-h-96">
        <li
          v-for="b in facets.colors &&
          facets.colors.all &&
          facets.colors.all.buckets"
          :key="b.key"
        >
          <Checkbox
            class="flex flex-row my-2 tracking-wider"
            color="primary"
            :docColor="b.key"
            :count="b.doc_count"
            :value="b.key"
            v-model="fl.colors"
            @change="changed({ model: 'colors', checked: fl.colors })"
          >
            <span>{{ b.key }}</span>
          </Checkbox>
        </li>
      </ul>
    </div>

    <div
      class="pt-3 pb-3 my-3 border-b"
      color="primary"
      v-if="
        facets.sizes &&
        facets.sizes.all &&
        facets.sizes.all.buckets &&
        facets.sizes.all.buckets.length > 0
      "
    >
      <h4 class="px-2 text-base font-medium uppercase ms-2">SIZES</h4>
      <ul class="px-2 overflow-auto font-light ms-2 max-h-96">
        <li
          v-for="b in facets.sizes &&
          facets.sizes.all &&
          facets.sizes.all.buckets"
          :key="b.key"
        >
          <Checkbox
            class="flex flex-row my-2 tracking-wider"
            color="primary"
            :count="b.doc_count"
            :value="b.key"
            v-model="fl.sizes"
            @change="changed({ model: 'sizes', checked: fl.sizes })"
            ><span class="my-auto"> {{ b.key }}</span>
          </Checkbox>
        </li>
      </ul>
    </div>

    <div
      class="pt-2 pb-5 my-3 border-b"
      v-for="(v, k) in facets.features &&
      facets.features.name &&
      facets.features.name.buckets"
      :key="k"
      v-if="v.key != 'Color' && v.val && v.val.buckets.length > 0"
    >
      <h4 class="px-2 text-base font-medium uppercase ms-2">{{ v.key }}</h4>
      <ul class="px-2 overflow-auto font-light ms-2 max-h-96">
        <li v-for="f in v.val.buckets" :key="f.key">
          <Checkbox
            class="flex flex-row my-2 tracking-wider"
            :count="f.doc_count"
            :value="f.key"
            v-model="fl[v.key]"
            @change="changed({ model: v.key, checked: fl[v.key] })"
          >
            <div class="flex items-center">
              <div
                data-colorhex="black"
                class="w-4 h-4 rounded-full shadow me-1"
                :style="{ 'background-color': 'red' }"
              ></div>
              <div class="my-auto">{{ f.key }}</div>
            </div>
          </Checkbox>
        </li>
      </ul>
    </div>

    <div
      class="pt-3 pb-3 my-3 border-b"
      v-if="
        facets.colors &&
        facets.colors.colors &&
        facets.colors.colors.name &&
        facets.colors.colors.name.buckets &&
        facets.colors.colors.name.buckets.length > 0
      "
    >
      <h4 class="px-2 text-base font-medium uppercase ms-2">COLOR</h4>
      <ul class="px-2 overflow-auto font-light ms-4 max-h-96">
        <li
          class="colour-listItem"
          v-for="b in facets.colors &&
          facets.colors.colors &&
          facets.colors.colors.name &&
          facets.colors.colors.name.buckets"
          :key="b.key"
        >
          <Checkbox
            class="flex flex-row my-2 tracking-wider text-primary-500"
            :color="b.val.buckets[0] && b.val.buckets[0].key"
            :count="b.doc_count"
            :value="b.key"
            v-model="fl.colors"
            @change="changed({ model: 'colors', checked: fl.colors })"
          >
            <span class="my-auto"> {{ b.key }}</span>
          </Checkbox>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Checkbox, ColorCheckbox, Radio } from '~/shared/components/ui'
import { constructURL } from '~/lib/'
export default {
  props: {
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
  components: { Checkbox, ColorCheckbox, Radio },
  data() {
    return {
      loadingPrice: true, // Required because after loading finished then only we will initiate the price slider component
    }
  },
  methods: {
    scrollToTop() {
      if (process.client) {
        window.scroll({ behavior: 'smooth', left: 0, top: 100 })
      }
    },
    categoryChanged(i) {
      console.error('categoryChanged', i)
    },
    changed(e) {
      this.scrollToTop()
      this.fl[e.model] = e.checked
      let url = constructURL('/search', this.fl)

      this.$router.push(url)
    },
    remove(k, i) {
      let ix = this.fl[k].indexOf(i)
      this.fl[k].splice(ix, 1)
      // this.$emit("removed", this.fl);
      let url = constructURL('/search', this.fl)
      this.$router.push(url)
    },
    checkCategory() {},
    go(slug) {
      this.$router.push('/' + slug)
    },
  },
}
</script>
<style scoped>
.lh {
}
.center-text {
  position: relative;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
}
</style>
