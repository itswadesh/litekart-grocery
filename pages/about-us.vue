<template>
  <ApolloQuery
    class
    :query="require('~/gql/page/pageSlug.gql')"
    :variables="{ slug: 'about-us' }"
    :update="
      (data) => {
        setPage(data.pageSlug)
        return data.pageSlug
      }
    "
  >
    <template v-slot="{ result: { error, data }, isLoading }">
      <div v-if="isLoading" class="w-full">Loading...</div>
      <ErrComponent v-else-if="error" />
      <main v-else-if="data">
        <Shortcode :content="data.content"></Shortcode>
      </main>
    </template>
  </ApolloQuery>
</template>
<script>
const Shortcode = () => import('~/components/Shortcode')

export default {
  data() {
    return {
      page: {},
    }
  },
  methods: {
    setPage(page) {
      this.page = page
    },
  },
  components: { Shortcode },
  head() {
    return {
      title: this.page && this.page.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page && this.page.metaDescription,
        },
        {
          hid: 'og:description',
          name: 'Description',
          property: 'og:description',
          content: this.page && this.page.metaDescription,
        },
        {
          hid: 'keywords',
          name: 'Keywords',
          property: 'keywords',
          content: this.page && this.page.metaKeywords,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: this.page && this.page.metaTitle,
        },
        // Twitter
        {
          name: 'twitter:title',
          content: this.page && this.page.metaTitle,
        },
        {
          name: 'twitter:description',
          content: this.page && this.page.metaDescription,
        },
      ],
    }
  },
}
</script>
