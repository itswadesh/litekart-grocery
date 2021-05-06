<template>
  <div class="relative mx-2 mb-2 rounded shadow-md" v-if="p">
    <nuxt-link :to="`/${p.slug}`">
      <img
        v-lazy="`${p.img}`"
        alt
        class="object-cover object-center w-full h-24 mb-2"
      />
    </nuxt-link>
    <div class="px-4 py-1">
      <div v-if="p.ratings" class="flex items-center">
        <Ratingcircle :rating="p.ratings" class="m-review" />
        <div class="pl-2 text-xs">{{ p.reviews }}</div>
      </div>
      <nuxt-link :to="`/${p.slug}`">
        <h2 class="text-xs font-bold tracking-wide truncate">{{ p.name }}</h2>
      </nuxt-link>
      <p>{{ p.description }}</p>
      <div class="flex flex-wrap items-center justify-between my-2">
        <div class="font-bold">
          {{ p.price | currency(settings.currency_symbol) }}
        </div>
        <div v-if="p.stock < 1" class="text-xs text-red-500">Out of stock</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Ratingcircle } from './ui'
export default {
  props: ['p'],
  methods: {},
  components: { Ratingcircle },
  computed: { ...mapGetters({ settings: 'settings' }) },
}
</script>

<style scoped></style>
