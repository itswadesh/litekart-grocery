<template>
  <ApolloQuery
    id="nav"
    :query="require('~/gql/category/categories.gql')"
    :variables="{ store: $store.state.store && $store.state.store.id }"
  >
    <template v-slot="{ result: { error, data }, isLoading }">
      <div v-if="isLoading">Loading...</div>
      <ErrComponent v-else-if="error" />
      <div
        :class="cls"
        style="width: 100vw"
        class="sticky top-0 z-10 flex flex-no-wrap w-full pl-1 mb-2 overflow-x-auto text-gray-700 bg-gray-100 border-t shadow-lg"
        v-else-if="data.categories.data"
      >
        <nuxt-link
          v-for="c in data.categories.data"
          :key="c.id"
          :to="`/c/${c.slug}`"
          class="text-center category-item"
        >
          <img
            v-lazy="`${c.img}?tr=w-170,h-162`"
            class="w-8 h-8 mb-2 rounded-full"
            alt
          />
          <span class="text-xs">{{ c.name }}</span>
        </nuxt-link>
      </div>
    </template>
  </ApolloQuery>
</template>

<script>
import categories from '~/gql/category/categories.gql'
import { OnelineSkeleton } from '~/shared/components/ui'
export default {
  components: { OnelineSkeleton },
  data() {
    return {
      categories: null,
      cls: '',
    }
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

<style scoped>
.fix-category {
  position: fixed;
  top: 0;
  left: 0;
  padding: 0px;
  z-index: 100;
  margin: 0px;
}
</style>
