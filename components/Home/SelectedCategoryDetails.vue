<template>
  <div v-if="products" class="flex justify-center w-full py-4">
    <div class="flex w-5/6 bg-gray-200">
      <div class="w-full text-center" v-if="products.length == 0">
        Products Not Found
      </div>
      <div v-else>
        <div
          class="flex justify-center w-full py-2 lg:w-1/3"
          v-for="(p, i) in products"
          :key="i"
        >
          <img v-lazy="p.img" class="object-cover w-1/2 h-48" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PRODUCTS from '~/gql/product/products.gql'

export default {
  mounted() {
    $nuxt.$on('showCatagory', (c) => {
      this.category = c
      // console.log(this.category, 'Category')
      this.getSelectedcategoriesProduct()
    })
  },
  methods: {
    async getSelectedcategoriesProduct() {
      try {
        this.products = (
          await this.$apollo.query({
            query: PRODUCTS,
            variables: {
              category: this.category.id,
            },
            fetchPolicy: 'no-cache',
          })
        ).data.products.data

        // console.log(this.products)
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
      }
    },
  },
  data() {
    return {
      category: null,
      products: null,
    }
  },
}
</script>
