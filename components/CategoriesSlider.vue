<template>
  <ApolloQuery id="nav" :query="require('~/gql/category/categories.gql')">
    <template v-slot="{ result: { error, data }, isLoading }">
      <div v-if="isLoading">Loading...</div>
      <ErrComponent v-else-if="error" />
      <div
        :class="cls"
        style
        class="w-full pl-1 mb-2 text-gray-700 bg-gray-100 border-t shadow-lg"
        v-else-if="megamenu"
      >
        <VueSlickCarousel v-bind="carouselSettings">
          <div v-for="(i, ix) in megamenu" :key="ix">
            <img class="object-cover w-full h-48 mx-4" v-lazy="i.img" alt />
          </div>
        </VueSlickCarousel>
        <!-- <Carousel
          :perPageCustom="[
            [320, 4],
            [768, 6],
            [1024, 10],
          ]"
          :paginationEnabled="false"
          :navigationEnabled="true"
          :centerMode="true"
          navigation-next-label="<img src='/chevron-right.svg' style='transform: rotate(180deg)' alt='right icon'>"
          navigation-prev-label="<img src='/chevron-right.svg' alt='prev icon'/>"
        >
          <slide v-for="c in megamenu" :key="c.id">
            <nuxt-link
              :to="`/c/${c.slug}`"
              class="flex flex-col items-center justify-center mb-2 mr-4 text-center"
            >
              <img v-lazy="`${c.img}`" />
              <div class>{{ c.name }}</div>
            </nuxt-link>
          </slide>
        </Carousel> -->
      </div>
    </template>
  </ApolloQuery>
</template>

<script>
import { mapGetters } from 'vuex'
// import { Carousel, Slide } from 'vue-carousel'
import categories from '~/gql/category/categories.gql'
import { OnelineSkeleton } from '~/shared/components/ui'
export default {
  components: {
    OnelineSkeleton,
    //  Carousel, Slide
  },
  data() {
    return {
      categories: null,
      cls: '',
      carouselSettings: {
        arrows: false,
        dots: false,
        autoplay: false,
        slidesToShow: 9,
        responsive: [
          {
            breakpoint: 1920,
            settings: {
              slidesToShow: 7,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
            },
          },
        ],
        lazyLoad: 'ondemand',
      },
    }
  },
  computed: {
    ...mapGetters({ megamenu: 'megamenu' }),
  },
  async mounted() {
    // if (process.client) {
    //   window.addEventListener('scroll', () => {
    //     let scrolled = window.scrollY
    //     this.cls = scrolled > 200 ? 'fix-category' : ''
    //   })
    // }
    try {
      this.$store.commit('clearErr', false)
      this.categories = (
        await this.$apollo.query({
          query: categories,
        })
      ).data.categories
    } catch (e) {
      this.$store.commit('setErr', e)
    } finally {
      this.$store.commit('busy', false)
    }
  },
}
</script>

<style>
@media (max-width: 600px) {
  .VueCarousel-navigation {
    display: none;
  }
}
@media (min-width: 600px) {
  .VueCarousel-pagination {
    display: none;
  }
}
.VueCarousel-pagination {
  position: absolute;
  bottom: -10px;
}
.VueCarousel-navigation button {
  opacity: 0.75;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: hsla(0, 0%, 100%, 0.98) !important;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.11);
}
.VueCarousel-navigation button.VueCarousel-navigation-prev {
  left: 27px !important;
}
.VueCarousel-navigation button.VueCarousel-navigation-next {
  right: 47px !important;
}
.VueCarousel-navigation button.VueCarousel-navigation--disabled {
  display: none;
}
.VueCarousel-navigation button.VueCarousel-navigation-prev img {
  margin-left: 25%;
}
.VueCarousel-navigation button.VueCarousel-navigation-next img {
  margin-left: 25%;
}
</style>
