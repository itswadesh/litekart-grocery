<template>
  <div class="rounded shadow border mx-2 mb-2 relative" v-if="p">
    <nuxt-link :to="`/${p.slug}`">
      <img v-lazy="`${p.img}`" alt class="w-full object-cover h-24 mb-2" />
    </nuxt-link>
    <div class="px-2">
      <div v-if="p.ratings">
        <Ratingcircle :rating="p.ratings" class="m-review" />
        <div class="pl-2 review-font">{{ p.reviews }} reviews</div>
      </div>
      <nuxt-link :to="`/${p.slug}`">
        <h2 class="text-xs font-bold tracking-wide">{{ p.name }}</h2>
      </nuxt-link>
      <p>{{ p.description }}</p>
      <div class="flex flex-wrap justify-between items-center my-2">
        <div class="font-bold">
          {{ p.price | currency(settings.currency_symbol) }}
        </div>
        <div v-if="p.stock < 1" class="text-red-500 text-xs">Out of stock</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'
import { Ratingcircle } from '~/shared/components/ui'
export default {
  props: ['p'],
  methods: {},
  components: { Ratingcircle },
  computed: { ...mapGetters({ settings: 'settings' }) },
}
</script>

<style scoped></style>
