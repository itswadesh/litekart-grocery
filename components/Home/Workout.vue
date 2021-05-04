<template>
  <div>
    <!--  -->
    <WorkoutSkeleton v-if="loading" />
    <div class="grid grid-cols-2 lg:grid-cols-4" v-if="banners">
      <nuxt-link
        :to="localePath(banners.data[0].link)"
        v-if="banners.data && banners.data[0]"
        class="w-auto h-64 col-span-2 m-2 lg:h-96 md:h-80 sm:m-3"
      >
        <img
          v-lazy="banners.data[0].img"
          class="object-cover w-full h-full border rounded"
        />
      </nuxt-link>
      <nuxt-link
        :to="localePath(banners.data[3].link)"
        v-if="banners.data && banners.data[3]"
        class="w-auto h-64 col-span-2 m-3 lg:h-96 md:h-80"
      >
        <img
          v-lazy="banners.data[1].img"
          class="object-cover w-full h-full border rounded"
        />
      </nuxt-link>
      <nuxt-link
        :to="localePath(banners.data[2].link)"
        v-if="banners.data && banners.data[2]"
        class="w-auto h-64 col-span-1 m-2 lg:h-96 md:h-80 sm:m-3"
      >
        <img
          v-lazy="banners.data[2].img"
          class="object-cover w-full h-full border rounded"
        />
      </nuxt-link>
      <nuxt-link
        :to="localePath(banners.data[5].link)"
        v-if="banners.data && banners.data[5]"
        class="w-auto h-64 col-span-1 m-2 lg:h-96 md:h-80 sm:m-3"
      >
        <img
          v-lazy="banners.data[3].img"
          class="object-cover w-full h-full border rounded"
        />
      </nuxt-link>
      <nuxt-link
        :to="localePath(banners.data[4].link)"
        v-if="banners.data && banners.data[4]"
        class="w-auto h-64 col-span-2 m-3 lg:h-96 md:h-80"
      >
        <img
          v-lazy="banners.data[4].img"
          class="object-cover w-full h-full border rounded"
        />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import WorkoutSkeleton from '~/components/AllSkeletons/WorkoutSkeleton'
import BANNERS from '~/gql/banner/banners.gql'
export default {
  components: { WorkoutSkeleton },
  data() {
    return {
      banners: null,
      loading: false,
    }
  },
  async created() {
    this.getBanners()
  },
  methods: {
    async getBanners() {
      this.loading = true
      try {
        this.banners = (
          await this.$apollo.query({
            query: BANNERS,
            variables: {
              type: 'banner',
            },
            fetchPolicy: 'no-cache',
          })
        ).data.banners
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
