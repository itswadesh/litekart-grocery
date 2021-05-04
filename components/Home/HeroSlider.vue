<template>
  <div class="bg-white focus:outline-none h-60 md:h-64 lg:h-80 xl:h-96">
    <div class="flex justify-center">
      <progress
        v-if="loading"
        class="absolute z-10 justify-center block m-3 material-progress-circular"
      />
    </div>
    <!-- <SlideBarSkeleton v-if="skeleton" /> -->
    <VueSlickCarousel
      v-bind="settings"
      v-if="banners && banners.data && banners.data.length"
      class="relative focus:outline-none"
    >
      <template #prevArrow="arrowOption">
        <div class="invisible custom-arrow md:visible hover:shadow-xl">
          {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
        </div>
      </template>
      <template #nextArrow="arrowOption">
        <div class="invisible custom-arrow md:visible hover:shadow-xl">
          {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
        </div>
      </template>
      <div
        v-for="b in banners.data"
        :key="b.id"
        class="p-5 overflow-hidden focus:outline-none"
      >
        <button @click="go(b.link)" class="z-auto my-auto focus:outline-none">
          <div class="rounded-2xl focus:outline-none">
            <img
              v-lazy="b.img"
              class="object-cover w-full my-auto overflow-hidden bg-white border focus:outline-none sm:border-none md:object-cover h-60 md:h-64 lg:h-80 xl:h-96 rounded-2xl"
            />
          </div>
        </button>
      </div>
      <!-- v-if="loading" -->
    </VueSlickCarousel>
  </div>
</template>

<script>
import SlideBarSkeleton from '~/components/AllSkeletons/SlideBarSkeleton'
import BANNERS from '~/gql/banner/banners.gql'

export default {
  data() {
    return {
      settings: {
        centerMode: true,
        centerPadding: '150px',
        centerMargin: '20px',
        focusOnSelect: false,
        infinite: true,
        slidesToShow: 1,
        speed: 500,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              centerPadding: '110px',
              centerMargin: '20px',
              slidesToScroll: 1,
              focusOnSelect: true,
              infinite: true,
            },
          },
          {
            breakpoint: 768,
            settings: {
              centerPadding: '60px',
              centerMargin: '15px',
              slidesToScroll: 1,
              focusOnSelect: true,
              infinite: true,
            },
          },
          {
            breakpoint: 640,
            settings: {
              centerPadding: '0px',
              centerMargin: '15px',
              slidesToScroll: 1,
              focusOnSelect: true,
              infinite: true,
            },
          },
        ],
      },
      banners: null,
      skeleton: false,
      loading: false,
    }
  },
  components: { SlideBarSkeleton },
  async created() {
    this.getBanners()
  },
  methods: {
    go(url) {
      this.$router.push(this.localePath(url))
    },
    async getBanners() {
      this.loading = true
      // this.skeleton = true
      try {
        this.banners = (
          await this.$apollo.query({
            query: BANNERS,
            variables: {
              type: 'slider',
            },
            fetchPolicy: 'no-cache',
          })
        ).data.banners
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
        // this.skeleton = false
      }
    },
  },
}
</script>
<style scoped>
.custom-arrow {
  height: 80px;
  width: 46px;
  padding: 3px;
  padding-top: 23px;
  background: #777;
  border-radius: 5px;
  opacity: 0.75;
  z-index: 1;
}
.slick-prev {
  left: 30px;
}
.slick-next {
  right: 30px;
}
.slick-prev:hover {
  background: #777;
}
.slick-next:hover {
  background: #777;
}
.slick-prev:before,
.slick-next:before {
  /* font-famiy: "slick"; */
  font-size: 40px;
  line-height: 1;
  opacity: 1;
  color: white;
  -webkit-font-smoothing: antialiased;
}
</style>
