<template>
  <div class="w-full my-4">
    <h2 class="m-2 text-xl font-bold">{{ title }}</h2>
    <VueSlickCarousel v-bind="carouselSettings">
      <div v-for="p in products[0] && products[0].items" :key="p.id">
        <Product :p="p" />
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
import Product from '~/components/ProductBestseller.vue'

export default {
  props: ['title', 'products'],
  data() {
    return {
      carouselSettings: {
        arrows: false,
        dots: false,
        autoplay: false,
        responsive: [
          {
            breakpoint: 1900,
            settings: {
              slidesToShow: 10,
            },
          },
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
