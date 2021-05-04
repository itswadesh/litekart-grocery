<template>
  <div>
    <div class="flex bg-white rounded shadow py-2 px-1 m-2 relative">
      <!-- <nuxt-link :to="`/${p.slug}`" class="p-2">
        <img v-lazy="p.img" class="w-32 h-20 rounded object-cover" />
      </nuxt-link> -->
      <div class="my-2 w-full">
        <!-- <nuxt-link v-if="p.vendor" :to="`/search/${p.vendor.info.store}`">
          <img
            v-lazy="p.vendor.avatar"
            class="bg-white border p-1 object-cover rounded-full h-8 w-8 absolute top-0 right-0 mt-2 mr-2"
          />
        </nuxt-link>-->
        <nuxt-link :to="`/${p.slug}`" class="font-bold tracking-wide">
          {{ p.name }}
        </nuxt-link>
        <div class="flex justify-between">
          <!-- <div class="flex items-center text-gray-500 tracking-widest text-sm">
            <svg
              class="w-4 transition-all ease-out "
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M18 11v7a2 2 0 0 1-4 0v-5h-2V3a3 3 0 0 1 3-3h3v11zM4 10a2 2 0 0 1-2-2V1a1 1 0 0 1 2 0v4h1V1a1 1 0 0 1 2 0v4h1V1a1 1 0 0 1 2 0v7a2 2 0 0 1-2 2v8a2 2 0 0 1-4 0v-8z"
              />
            </svg>
            {{ p.vendor.info.store }}
          </div>-->
          <div class="font-black text-xl text-gray-700">
            {{ p.price | currency(settings.currency_symbol) }}
          </div>
        </div>
        <!-- <div class="flex justify-between items-center">
          <div class="flex items-center">
            <Ratingcircle :rating="p.ratings" class="m-review" />
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Ratingcircle } from '~/shared/components/ui'
export default {
  props: ['p'],
  methods: {},
  components: { Ratingcircle },
  computed: { ...mapGetters({ settings: 'settings' }) },
}
</script>

<style scoped></style>
