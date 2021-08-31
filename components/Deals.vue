<template>
  <div>
    <ApolloQuery
      :query="require('~/gql/deal/deals.gql')"
      :variables="{ store: $store.state.store && $store.state.store.id }"
    >
      <template v-slot="{ result: { error, data }, isLoading }">
        <div v-if="isLoading">
          <div>Loading</div>
        </div>
        <ErrComponent v-else-if="error" :error="error" />
        <div
          class="flex flex-wrap justify-center mx-2"
          v-else-if="data.deals && data.deals.data.length > 0"
          v-for="deal of data.deals.data"
          :key="deal.id"
        >
          <h3>
            <vue-countdown-timer
              :start-time="deal.startTimeISO"
              :end-time="deal.endTimeISO"
              :interval="1000"
              :start-label="`${deal.name} starts in`"
              :end-label="`${deal.name} ends in`"
              label-position="begin"
              :end-text="`${deal.name} ended`"
              :day-txt="'days'"
              :hour-txt="'hours'"
              :minutes-txt="'minutes'"
              :seconds-txt="'seconds'"
            />
          </h3>
          <div v-for="p in deal.products" :key="p.id">
            <router-link :to="`/${p.slug}`">
              <img v-lazy="`${p.img}`" height="250px" />
            </router-link>
          </div>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>
<script>
export default {
  props: {
    deal: { type: Object },
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
.deals {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.fx {
  display: flex;
  font-size: 1.2em;
}
.fx .icon {
  font-size: 2em;
}
</style>
