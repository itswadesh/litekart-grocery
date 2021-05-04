<template>
  <div class="">
    <div class="container mx-auto mt-2 md:min-h-screen">
      <div>
        <div v-if="loading">Loading</div>
        <transition-group :css="false" name="slide-up" class="flex flex-wrap">
          <ListCard
            class="w-full slide-up-item md:w-1/2 lg:w-1/3 xl:w-1/4"
            v-for="p in data"
            :key="p.id"
            :p="p"
          />
          <infinite-loading @infinite="loadMore" key="il" />
        </transition-group>
      </div>
      <div v-if="data.length < 1 && !loading" class="mx-2 mt-40 text-center">
        No item found for selected location. Please modify your search
      </div>
    </div>
    <!-- <GeoLocation /> -->
    <StickyFooter class="mt-20" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  Heading,
  Banner,
  Product,
  ListCardSkeleton,
  ListCard,
  Categories,
  GeoLocation,
  SelectablePlan,
  Search,
} from '~/shared/components'
import StickyFooter from '~/components/StickyFooter'
import Nav from '~/components/Nav'
// import ListCard from '~/components/ListCard'
import { infiniteScroll } from '~/shared/mixins'
import { constructURL } from '~/shared/lib/'
import search from '~/gql/product/search.gql'
// import gsap from 'gsap'

export default {
  mixins: [infiniteScroll],
  data() {
    return {
      type: '',
      model: search,
      attr: 'search',
    }
  },
  components: {
    Nav,
    Search,
    Heading,
    Banner,
    Product,
    Categories,
    ListCard,
    ListCardSkeleton,
    GeoLocation,
    StickyFooter,
    SelectablePlan,
  },
  created() {
    this.type = this.$route.query.type || ''
  },
  computed: { ...mapGetters({ loading: 'loading' }) },
  methods: {
    // beforeEnter(el) {
    //   gsap.from(el, {
    //     x: -200,
    //     y: 200,
    //     duration: 0.5,
    //     opacity: 0,
    //     scale: 0.1,
    //     ease: 'power1',
    //     stagger: 0.2,
    //   })
    // },
    // enter(el, done) {},
    // beforeLeave(el) {},
    // leave(el, done) {
    //   gsap.to(el, {
    //     position: 'absolute',
    //     x: 200,
    //     duration: 0.3,
    //     opacity: 0,
    //     onComplete: done,
    //     scale: 0,
    //     ease: 'power1',
    //   })
    // },
    filter() {
      this.$router.push(
        `/search/${this.$route.params.q || ''}?type=${this.type}`
      )
    },
  },
}
</script>
<style scoped>
.slide-up-move {
  transition: transform 1s;
}
</style>
