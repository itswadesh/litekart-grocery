<template>
  <div>
    <ApolloQuery
      :query="require('~/gql/category/category.gql')"
      :variables="{ slug: $route.params.slug }"
    >
      <template v-slot="{ result: { error, data }, isLoading }">
        <HeadingFlat v-if="isLoading">Explore ...</HeadingFlat>
        <ErrComponent v-else-if="error" :error="error" />
        <div v-else-if="data && data.category">
          <div class="flex items-center justify-center">
            <img
              :src="data.category.img"
              :alt="data.category.name"
              class="w-24 mr-4"
            />
            <HeadingFlat class="border-b">
              Explore {{ data.category.name }}
            </HeadingFlat>
          </div>
          <div>
            <div
              class="flex items-center justify-center"
              v-for="c in data.category.children"
              :key="c._id"
            >
              <img :src="c.img" :alt="c.name" class="w-16 mr-2" />
              {{ c.name }}
            </div>
          </div>
        </div>
        <div v-else>Category not found</div>
      </template>
    </ApolloQuery>
    <Banner />
    <div class="container mx-auto mt-2 mb-20 md:min-h-screen">
      <!-- <div class="flex flex-wrap">
        <div class="w-1/2" v-for="p in products" :key="p._id">
          <Product :p="p" class />
        </div>
      </div>-->
      <!-- <Categories /> -->
      <ApolloQuery
        :query="require('~/gql/product/products.gql')"
        :variables="{
          category: $route.params.slug,
          store: $store.state.store && $store.state.store.id,
        }"
      >
        <template v-slot="{ result: { error, data }, isLoading }">
          <div v-if="isLoading">Loading...</div>
          <ErrComponent v-else-if="error" :error="error" />

          <div
            class="flex flex-wrap"
            v-else-if="
              data &&
              data.products &&
              data.products.data &&
              data.products.data.length
            "
          >
            <ListCard
              v-for="p in data.products.data"
              :key="p.id"
              :p="p"
              class="w-full slide-up-item md:w-1/2 lg:w-1/3 xl:w-1/4"
              :isLoading="isLoading"
            />
          </div>
          <div v-else class="mt-48 text-center">
            No items under this category
          </div>
        </template>
      </ApolloQuery>
    </div>
    <StickyFoote class="mt-20" />
  </div>
</template>

<script>
import {
  HeadingFlat,
  Banner,
  Product,
  ListCard,
  Categories,
} from '~/shared/components'
import StickyFooter from '~/components/StickyFooter'

export default {
  components: {
    HeadingFlat,
    Banner,
    Product,
    Categories,
    ListCard,
    StickyFooter,
  },
}
</script>
