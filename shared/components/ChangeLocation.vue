<template>
  <div class="h-screen">
    <Heading title="Search your area" />
    <div class="mx-4 my-8">
      <!-- <button class="flex items-center text-orange-500">
        <svg
          class="w-6 h-6 transition-all ease-out "
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
          />
        </svg> Use Current Location
      </button> -->
      <ErrComponent v-if="err" :error="err" />

      <h3 class="my-4 text-xl text-gray-600">Please select location</h3>
      <ApolloQuery
        :query="require('~/gql/location/cities.gql')"
        :variables="{
          active: true,
          store: $store.state.store && $store.state.store.id,
        }"
      >
        <template v-slot="{ result: { error, data }, isLoading }">
          <LocationPillsSkeleton v-if="isLoading" />
          <ErrComponent v-else-if="error" :error="error" />
          <div class="flex" v-else-if="data.cities.data">
            <button
              class="px-4 py-2 mr-4 text-center bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
              @click="saveLocaion(c)"
              v-for="c in data.cities.data"
              :key="c.id"
            >
              {{ c.name }}
            </button>
          </div>
        </template>
      </ApolloQuery>
      <!-- <select v-model="location" filled label="Select City">
        <option selected="true" value="null">Select Location</option>
        <option v-for="(c, ix) in cities" :key="ix" :value="c">{{ c.name }}</option>
      </select>-->
      <!-- <div class="flex justify-center m-6">
        <Submit>Save Location</Submit>
      </div>-->
    </div>
  </div>
</template>
<script>
import Heading from '~/shared/components/Heading'
import { Submit, Textbox, LocationPillsSkeleton } from '~/shared/components/ui'
import { location } from '~/shared/mixins'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: { Heading, Submit, Textbox, LocationPillsSkeleton },
  layout: 'none',
  mixins: [location],
  data() {
    return {
      location: null,
      city: null,
      geo: null,
      gettingLocation: false,
      err: null,
    }
  },
  methods: {
    ...mapActions({
      updateProfile: 'auth/updateProfile',
    }),
    async saveLocaion(c) {
      // try {
      this.$store.commit('clearErr')
      this.geo = await this.locateMe(c)
      if (this.geo) {
        if (this.user) {
          // If already logged in update profile
          delete this.geo.__typename
          await this.updateProfile({ address: this.geo })
        }
        this.$router.push('/')
      }
      // } catch (e) {
      //   this.err = { message: e }
      // }
      this.$store.commit('busy', false)
    },
    go(url) {
      this.$router.push(url)
    },
  },
  computed: {
    ...mapGetters({ user: 'auth/user', settings: 'settings' }),
  },
}
</script>
<style scoped>
select {
  appearance: none;
  outline: 0;
  background: gray;
  background-image: none;
  border: 1px solid black;
  border-radius: 0.25em;
  padding: 10px 20px;
  color: #fff;
  cursor: pointer;
}
select::-ms-expand {
  display: none;
}
.select::after {
  content: '\25BC';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 0 1em;
  background: #34495e;
  pointer-events: none;
}
.select:hover::after {
  color: #f39c12;
}
.select::after {
  transition: 0.25s all ease;
}
</style>
