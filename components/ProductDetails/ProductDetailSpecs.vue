<template>
  <div class="w-full px-2 pt-3 xl:mx-auto" v-if="product">
    <div v-if="product.description">
      <span
        class="flex justify-center pb-2 font-normal text-center text-gray-700 uppercase text-normal md:justify-start"
      >
        Description
      </span>
      <div class="pb-4 text-base font-light" v-html="product.description" />
    </div>
    <!-- key featires -->
    <div v-if="product.keyFeatures && product.keyFeatures.length">
      <span
        class="flex justify-center pt-5 pb-2 font-normal text-center text-gray-700 uppercase md:justify-start text-normal"
      >
        Key Features
      </span>
      <div>
        <ul class="text-base font-light">
          <li
            class="flex flex-row py-2"
            v-for="kf in product.keyFeatures"
            :key="kf.id"
          >
            <div class="w-5 h-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <span class="leading-5 ms-2"> {{ kf }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="mt-8"
      v-if="product.productDetails && product.productDetails.length"
    >
      <div
        class="flex justify-center h-12 my-auto font-normal text-center text-gray-700 uppercase bg-white sm:bg-gray-300 md:justify-start text-normal"
      >
        <span class="my-auto ps-5">Product Details</span>
      </div>
      <div
        v-for="(s, ix) in product.productDetails"
        v-if="s"
        :key="ix"
        class="flex-row hidden text-lg font-light text-gray-500 sm:flex"
      >
        <div class="w-1/3 p-1 my-auto capitalize ps-3">
          {{ s.name }}
        </div>
        <div class="w-2/3 p-1 my-auto capitalize">
          {{ s.value }}
        </div>
      </div>
      <!-- mobile screen  -->
      <div
        v-for="(s, ix) in product.productDetails"
        v-if="s"
        :key="ix + 's'"
        class="flex flex-col text-base font-light text-gray-500 bg-gray-200 sm:hidden"
      >
        <span class="w-full p-2 my-auto capitalize bg-white">
          {{ s.name }}
        </span>
        <span class="w-full p-2 my-auto capitalize bg-gray-100">
          {{ s.value }}
        </span>
      </div>
    </div>

    <div class="mt-8" v-if="product.features && product.features.length">
      <div
        class="flex justify-center h-12 my-auto font-normal text-center bg-white sm:bg-gray-300 md:justify-start desc"
      >
        <span class="my-auto uppercase ps-5">Specifications</span>
      </div>
      <div
        v-for="(s, ix) in product.features"
        v-if="s"
        :key="ix + 'ss'"
        class="flex-row hidden text-lg font-light text-gray-500 sm:flex"
      >
        <div class="w-1/3 p-1 my-auto capitalize ps-3">
          {{ s.name }}
        </div>
        <div class="w-2/3 p-1 my-auto capitalize">
          {{ s.value }}
        </div>
      </div>
      <!-- mobile screen  -->
      <div
        v-for="(s, index) in product.features"
        v-if="s"
        :key="s.id"
        class="flex flex-col text-base font-light text-gray-600 sm:hidden"
      >
        <span class="w-full p-2 my-auto capitalize bg-white">
          {{ s.name }}
        </span>
        <span class="w-full p-2 my-auto text-sm capitalize bg-gray-100">
          {{ s.value }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import PRODUCT from '~/gql/product/product.gql'
export default {
  props: {
    product: Object,
  },
  data() {
    return {
      review: false,
      returninfo: false,
      desc: false,
      spec: false,
      selectedCategory: 'spec',
      specification: [
        { point: 'Product Dimentions', disc: '500*452' },
        { point: 'First Available From', disc: '12/02/2025' },
        { point: 'Manufaturer', disc: 'Goa' },
        { point: 'Origin', disc: 'India' },
        { point: 'Item Weight', disc: '250gm' },
        { point: 'Category', disc: 'Toy Product' },
      ],
    }
  },
  async created() {
    // await this.getProduct()
  },
  methods: {
    onSelectCategory(val) {
      this.selectedCategory = val
    },
    // async getProduct() {
    //   this.loading = true
    //   try {
    //     this.product = (
    //       await this.$apollo.query({
    //         query: PRODUCT,
    //         variables: { id: this.$route.query.id },
    //         fetchPolicy: 'no-cache',
    //       })
    //     ).data.product
    //     // console.log('product details', this.product)
    //   } catch (e) {
    //     // console.log(e)
    //   } finally {
    //     this.loading = false
    //   }
    // },
  },
}
</script>
