<template>
  <div class="w-full mx-auto mt-12 bg-gray-100 border-b">
    <ul class="container flex flex-row justify-center mx-auto text-sm">
      <li
        class="h-auto mx-1 my-auto border-b-4 border-gray-100 cursor-pointer hoverable"
        :class="{
          'hover:border-purple-400': index % 5 == 0,
          'hover:border-red-500': index % 5 == 1,
          'hover:border-green-500': index % 5 == 2,
          'hover:border-pink-500': index % 5 == 3,
          'hover:border-blue-500': index % 5 == 4,
        }"
        v-for="(category, index) in megamenu"
        :key="category.id"
      >
        <nuxt-link
          :to="localePath(`/c/${category.slug}`)"
          class="relative flex flex-row items-center flex-shrink-0 p-2 py-3 mx-auto my-auto text-base font-light text-gray-600"
        >
          {{ category.name }}
          <!-- chevron-down-icon -->
          <svg
            v-if="category.children != 0"
            class="w-4 h-4 my-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </nuxt-link>
        <div
          class="w-auto mx-auto mt-1 mb-16 bg-white shadow-xl mega-menu sm:mb-0"
        >
          <div class="flex justify-start w-full px-10 mx-auto">
            <ul
              v-for="(c, index) in category.children"
              :key="index"
              class="w-full px-4 pt-6 pb-6 border-b border-gray-600 sm:w-1/2 text-1 lg:w-1/5 lg:border-b-0 lg:pt-3"
              :class="{ 'bg-gray-50': Math.abs(index % 2) }"
            >
              <nuxt-link :to="localePath(`/c/${c.slug}`)" class="flex">
                <div
                  class="flex items-center mb-1 font-bold text-black"
                  :class="{
                    'text-yellow-500': index % 6 == 0,
                    'text-purple-500': index % 6 == 1,
                    'text-red-500': index % 6 == 2,
                    'text-green-500': index % 6 == 3,
                    'text-pink-500': index % 6 == 4,
                    'text-blue-500': index % 6 == 5,
                  }"
                >
                  {{ c.name }}
                </div>
              </nuxt-link>
              <div class="flex py-1 text-sm font-light text-start">
                <ul>
                  <li
                    class="py-1 text-gray-600"
                    v-for="(c1, index) in c.children"
                    :key="index"
                  >
                    <nuxt-link :to="localePath(`/c/${c1.slug}`)">
                      <span class="w-56 truncate hover:font-bold">
                        {{ c1.name }}</span
                      >
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
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
