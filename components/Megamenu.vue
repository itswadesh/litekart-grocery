<template>
  <ul class="flex container">
    <li
      class="cursor-pointer hoverable border-white border-b-2 hover:border-pink-500"
      v-for="category in megamenu"
      :key="category.id"
    >
      <nuxt-link
        :to="`/${category.slug}`"
        class="p-5 relative block font-bold items-center"
      >
        {{ category.name }}
        <!-- <ArrowDownRightIcon />-->
      </nuxt-link>
      <div class="mega-menu mb-16 sm:mb-0 shadow-xl bg-gray-100">
        <div class="mx-auto w-full flex flex-wrap justify-start mx-2">
          <ul
            v-for="(c, ix) in category.children"
            :key="c.id"
            class="px-4 w-full sm:w-1/2 text-1 lg:w-1/6 border-gray-600 border-b lg:border-b-0 pb-6 pt-6 lg:pt-3"
            :class="{ 'bg-gray-200': Math.abs(ix % 2) }"
          >
            <div class="flex">
              <div
                class="flex font-bold text-sm text-black text-bold mb-1 items-center"
              >
                {{ c.name }}
                <div class="pl-1" style="padding-top: 2px;">
                  <ChevronRightIcon />
                </div>
              </div>
            </div>
            <div class="flex items-center py-3">
              <ul>
                <li
                  class="py-1 text-gray-600"
                  v-for="(c, index) in c.children"
                  :key="index"
                >
                  <nuxt-link :to="`/${c.slug}?page=1`">{{ c.name }}</nuxt-link>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import { ChevronRightIcon } from 'vue-feather-icons'
export default {
  components: { ChevronRightIcon },
  computed: {
    ...mapGetters({ megamenu: 'megamenu' }),
  },
}
</script>

<style scoped>
.mega-menu {
  visibility: hidden;
  transition: 0.2s 0.1s; /* delay of 1 seconds on hover off */
  opacity: 0;
  left: 0;
  position: absolute;
  text-align: left;
  width: 100%;
  z-index: 9999;
}

/* #hoverable Class Styles
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
.hoverable {
  position: static;
}

.hoverable > a:after {
  padding-left: 6px;
  position: relative;
}

.hoverable:hover .mega-menu {
  visibility: visible;
  opacity: 1;
  transition-delay: 0.1s;
}
</style>
