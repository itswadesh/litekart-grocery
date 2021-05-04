<template>
  <div>
    <Hero />
    <div class="mb-20 lg:min-h-screen">
      <!-- <Deals /> -->
      <CategoriesSlider />
      <Popular />
      <!-- <RecentVisit /> -->
      <BestSellers />
    </div>
    <StickyFooter class="mt-20" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Nav from '~/components/Nav'
import Categories from '~/components/Categories'
import CategoriesSlider from '~/components/CategoriesSlider'
import {
  Header,
  Heading,
  Hero,
  Product,
  GeoLocation,
} from '~/shared/components'
import StickyFooter from '~/components/StickyFooter'
import BestSellers from '~/components/Home/BestSellers'
import Popular from '~/components/Home/Popular'
import RecentVisit from '~/components/Home/RecentVisit'
import Deals from '~/components/Deals'
export default {
  components: {
    Header,
    Nav,
    Hero,
    Product,
    Categories,
    StickyFooter,
    BestSellers,
    RecentVisit,
    Popular,
    Heading,
    GeoLocation,
    Deals,
    CategoriesSlider,
  },
  computed: {
    ...mapGetters({ settings: 'settings' }),
  },
  head() {
    const host = process.server
      ? this.$ssrContext.req.headers.host
      : window.location.host
    return {
      title: this.settings.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.settings.description,
        },
        {
          hid: 'og:description',
          name: 'Description',
          property: 'og:description',
          content: this.settings.description,
        },
        {
          name: 'Keywords',
          content: this.settings.keywords,
        },
        {
          hid: 'og:title',
          name: 'og_title',
          property: 'og:title',
          content: this.settings.title,
        },
        {
          name: 'og_url',
          property: 'og:url',
          content: host,
        },
        {
          name: 'og_image',
          property: 'og:image',
          content: host + this.settings.open_graph_image,
        },

        {
          name: 'twitter:title',
          content: this.settings.title,
        },
        {
          hid: 'twitter_description',
          name: 'twitter:description',
          content: this.settings.description,
        },
      ],
    }
  },
}
</script>
