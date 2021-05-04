<template>
  <div class="w-full my-4">
    <h2 class="m-2 text-xl font-bold">{{ title }}</h2>
    <VueSlickCarousel
      v-bind="carouselSettings"
      v-if="products && products.length"
    >
      <div v-for="p in products" :key="p.id" class="flex">
        <Product :p="p" class="w-full" />
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
import { Product } from '~/shared/components'

export default {
  props: ['title', 'products'],
  data() {
    return {
      carouselSettings: {
        arrows: false,
        dots: false,
        autoplay: false,
        slidesToShow: 10,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 8,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 450,
            settings: {
              slidesToShow: 2,
            },
          },
        ],
        lazyLoad: 'ondemand',
      },
    }
  },
  components: {
    Product,
  },
}
</script>

<style scoped></style>
