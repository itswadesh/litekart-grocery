<template>
  <div
    class="fixed inset-x-0 bottom-0 z-50 flex flex-col w-full mx-auto mt-12 overflow-x-hidden transition bg-white shadow conatiner height rounded-2xl"
  >
    <div
      class="fixed z-50 flex flex-row justify-between w-full p-3 px-5 bg-white border-b-2 rounded-t-lg h-18"
    >
      <span class="text-xl font-semibold tracking-wider text-gray-700">
        Filters
      </span>
      <span class="my-auto text-sm font-medium tracking-widest text-gray-400">
        CLEAR ALL
      </span>
    </div>
    <div class="z-50 flex flex-row">
      <div
        class="flex flex-col w-2/5 overflow-x-hidden text-gray-500 bg-gray-50 margintop left-height"
      >
        <!-- color -->
        <div @click="onSelectCategory('color')" class="cursor-pointer">
          <div
            class="p-3 pl-5"
            :class="{
              'bg-white border-s-4 border-primary-500':
                selectedCategory == 'color',
            }"
          >
            Colour
          </div>
        </div>
        <!-- price  -->
        <div @click="onSelectCategory('price')" class="cursor-pointer">
          <div
            class="p-3 pl-5"
            :class="{
              'bg-white border-s-4 border-primary-500':
                selectedCategory == 'price',
            }"
          >
            Price
          </div>
        </div>
        <!-- brands  -->
        <div @click="onSelectCategory('brand')" class="cursor-pointer">
          <div
            class="p-3 pl-5"
            :class="{
              'bg-white border-s-4 border-primary-500':
                selectedCategory == 'brand',
            }"
          >
            Brands
          </div>
        </div>
      </div>
      <!--  -->
      <div
        class="flex flex-col w-3/5 h-auto -mt-3 overflow-hidden z-1 right-height"
      >
        <FilterComponent
          class="h-auto mt-16 overflow-hidden overflow-y-auto left-height"
          @onChangeValue="onChangeValue"
          :fl="fl"
          :details="colors"
          :model="'color'"
          v-if="selectedCategory == 'color'"
        />
        <FilterComponent
          class="h-auto mt-16 overflow-hidden overflow-y-auto left-height"
          @onChangeValue="onChangeValue"
          :fl="fl"
          :details="price"
          :model="'price'"
          v-if="selectedCategory == 'price'"
        />
        <FilterComponent
          class="h-auto mt-16 overflow-hidden overflow-y-auto left-height"
          @onChangeValue="onChangeValue"
          :fl="fl"
          :details="brands"
          :model="'brand'"
          v-if="selectedCategory == 'brand'"
        />
      </div>
    </div>
    <div
      class="fixed inset-x-0 bottom-0 z-10 flex flex-row p-5 bg-white border shadow"
    >
      <button
        @click="hideFilter"
        class="w-1/3 h-12 p-1 tracking-wider text-gray-700 bg-gray-300 rounded me-3 focus:outline-none text-medium"
      >
        CLOSE
      </button>
      <button
        class="w-2/3 h-12 p-1 tracking-wider text-white rounded hover:bg-accent-500 focus:outline-none bg-primary-500 text-medium"
      >
        APPLY
      </button>
    </div>
  </div>
</template>

<script>
import FilterComponent from '~/components/Listing/FilterComponent'
import GET_BRANDS from '~/gql/brand/brands.gql'
import GET_SIZES from '~/gql/size/sizes.gql'
import GET_COLORS from '~/gql/color/colors.gql'

export default {
  components: {
    FilterComponent,
  },
  mounted() {
    // console.log(this.fl)
    $nuxt.$on('onSelectCategory', (val) => {
      // console.log('on change value')
      this.fl.category = val
      this.onChangeValue()
    })
  },
  data() {
    return {
      fl: {},
      selectedSize: [],
      selectedBrand: [],
      selectedColor: [],
      brands: [],
      colors: [],
      sizes: [],

      isFilter: true,
      color: false,
      price: false,
      brand: false,
      selectedCategory: 'color',
    }
  },
  watch: {
    // '$route.query.brand': function () {
    //   // console.log(decodeURI(this.$route.query.brand))
    //   if (this.$route.query.brand)
    //     this.selectedBrand = this.$route.query.brand.split(',')
    //   else {
    //     this.selectedBrand = []
    //   }
    //   console.log(this.selectedBrand)
    // },

    '$route.query': function () {
      this.fl = this.$route.query
      // console.log(this.fl)
    },
  },
  async created() {
    this.fl = this.$route.query
    await this.getBrands()
    await this.getSizes()
    await this.getColors()

    if (this.$route.query.brand) {
      var decodedBrand = decodeURI(this.$route.query)
      this.selectedBrand = decodedBrand.split(',')
      // console.log(this.selectedBrand)
    }

    if (this.$route.query.color) {
      var decodedColor = decodeURI(this.$route.query.color)
      // console.log(decodedColor)
      this.selectedColor = decodedColor.split(',')
      // console.log(this.selectedColor)
    }

    if (this.$route.query.size) {
      var decodedSize = decodeURI(this.$route.query.size)
      // console.log(decodedSize)
      this.selectedSize = decodedSize.split(',')
      // console.log(this.selectedSize)
    }
  },
  methods: {
    show(e) {
      this.isFilter = true
    },
    hideFilter(e) {
      this.$emit('hideFilter', true)
    },
    onSelectCategory(val) {
      this.selectedCategory = val
    },
    async onChangeValue() {
      // console.log(this.fl, 'filterrrrrrrrrrrrrrrrr')
      var link = await this.getUrl()
      link = link.substr(0, link.length - 1)
      this.$router.push(`/c/${this.$route.params.slug}${link}`)
    },
    getUrl() {
      var url = '?'

      Object.keys(this.fl).forEach((e) => {
        if (
          this.fl[e] &&
          e != 'sort' &&
          this.fl[e] != undefined &&
          this.fl[e].length > 0
        ) {
          url += `${e}=${this.fl[e]}&`
        }
      })
      return url
    },
    onChangeBrand() {
      this.selectedBrand = this.selectedBrand.toString()
      var encoded = encodeURI(this.selectedBrand)

      this.$router.replace(
        `/c/${this.$route.params.slug}?brands=${this.selectedBrand}${
          this.$route.query.size ? '&size=' + this.$route.query.size : ''
        }
        ${this.$route.query.color ? '&color=' + this.$route.query.color : ''}
         ${this.$route.query.sortBy ? '&sort=' + this.$route.query.sortBy : ''}`
      )
    },

    onChangeColors() {
      this.selectedColor = this.selectedColor.toString()
      var encoded = encodeURI(this.selectedColor)
      this.$router.replace(
        `/c/${this.$route.params.slug}?color=${this.selectedColor}${
          this.$route.query.size ? '&size=' + this.$route.query.size : ''
        }
        ${this.$route.query.brand ? '&brands=' + this.$route.query.brand : ''}
         ${this.$route.query.sortBy ? '&sort=' + this.$route.query.sortBy : ''}`
      )
    },

    onChangeSize() {
      this.selectedSize = this.selectedSize.toString()
      this.$router.push(
        `/c/${this.$route.params.slug}?size=${this.selectedSize}${
          this.$route.query.color ? '&color=' + this.$route.query.color : ''
        }
        ${this.$route.query.brand ? '&brands=' + this.$route.query.brand : ''}
         ${this.$route.query.sortBy ? '&sort=' + this.$route.query.sortBy : ''}`
      )
    },
    async getBrands() {
      try {
        this.brands = (
          await this.$apollo.query({
            query: GET_BRANDS,
            variables: { level: 0 },
            fetchPolicy: 'no-cache',
          })
        ).data.brands.data
      } catch (e) {
      } finally {
      }
    },

    async getSizes() {
      try {
        this.sizes = (
          await this.$apollo.query({
            query: GET_SIZES,
            variables: { level: 0 },
            fetchPolicy: 'no-cache',
          })
        ).data.sizes.data
      } catch (e) {
      } finally {
      }
    },

    async getColors() {
      // console.log('get categories')
      try {
        this.colors = (
          await this.$apollo.query({
            query: GET_COLORS,
            variables: { level: 0 },
            fetchPolicy: 'no-cache',
          })
        ).data.colors.data
        // console.log(this.colors, 'colors')
      } catch (e) {
        // console.log(e)
      } finally {
      }
    },
  },
}
</script>

<style scoped>
.margintop {
  margin-top: 3.4rem;
}
.height {
  height: 38.3rem;
}
.right-height {
  height: 33.1rem;
}
.left-height {
  height: 29.4rem;
}
</style>
