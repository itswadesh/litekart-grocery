<template>
  <div class="w-full my-4">
    <h2 class="m-2 text-xl">{{ title }}</h2>
    <!-- <carousel
      :perPageCustom="[
        [450, 2],
        [768, 4],
        [1024, 6],
        [1600, 8],
        [1900, 10],
      ]"
      :paginationEnabled="false"
    >
      <slide v-for="p in products" :key="p.id" class="px-2">
        <img class="object-cover w-full h-32" v-lazy="p.img" alt />
        <div class="text-center truncate">{{ p.name }}</div>
      </slide>
    </carousel> -->
  </div>
</template>

<script>
import Vue from 'vue'
// import { Carousel, Slide } from 'vue-carousel'

export default {
  props: ['title', 'products'],
  components: {
    // Carousel,
    // Slide,
  },
}
</script>

<style scoped></style>
