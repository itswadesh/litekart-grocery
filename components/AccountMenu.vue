<template>
  <div class="min-h-screen bg-gray-200 lg:w-1/5">
    <ApolloQuery :query="require('~/gql/user/me.gql')">
      <template v-slot="{ result: { error, data }, isLoading }">
        <div v-if="isLoading" class="h-56 bg-white"></div>
        <ErrComponent v-else-if="error" :error="error" />
        <div
          v-else-if="data && data.me"
          class="w-full p-10 leading-loose text-center bg-white border-b border-gray-200 shadow"
        >
          <div class="mb-2">
            <img
              v-if="data.me.avatar"
              class="inline-block object-cover w-16 h-16 rounded-full"
              v-lazy="data.me.avatar"
              alt
            />
            <span
              v-else
              class="inline-block w-20 h-20 p-2 text-4xl text-gray-600 bg-gray-200 rounded-full"
              >{{ data.me.firstName | first }}</span
            >
          </div>
          <div class="text-lg">{{ data.me.firstName }} {{ user.lastName }}</div>
          <div class="text-sm text-gray-500" v-if="data.me.phone">
            {{ data.me.phone }}
          </div>
          <div class="text-sm text-gray-500" v-if="data.me.email">
            {{ data.me.email }}
          </div>
        </div>
      </template>
    </ApolloQuery>
    <div class="p-8 bg-gray-200">
      <div class="flex justify-center">
        <nav id="nav" class="relative w-full">
          <ul class="relative">
            <nuxt-link
              to="/my/orders"
              class="flex items-center w-full px-3 py-2 focus:outline-none focus-visible:underline"
              exact-active-class="active"
            >
              <TruckIcon class="w-6 h-6 transition-all ease-out" />
              <span class="ml-2 text-sm font-medium transition-all ease-out"
                >Orders</span
              >
            </nuxt-link>
            <nuxt-link
              to="/my/address"
              class="flex items-center w-full px-3 py-2 focus:outline-none focus-visible:underline"
              exact-active-class="active"
            >
              <HomeIcon class="w-6 h-6 transition-all ease-out" />
              <span class="ml-2 text-sm font-medium transition-all ease-out"
                >Address</span
              >
            </nuxt-link>
            <nuxt-link
              to="/my/profile"
              class="flex items-center w-full px-3 py-2 focus:outline-none focus-visible:underline"
              exact-active-class="active"
            >
              <UserIcon class="w-6 h-6 transition-all ease-out" />
              <span class="ml-2 text-sm font-medium transition-all ease-out"
                >Profile Details</span
              >
            </nuxt-link>
            <nuxt-link
              v-if="user && user.provider == 'local'"
              to="/account/change-password"
              class="flex items-center w-full px-3 py-2 focus:outline-none focus-visible:underline"
              exact-active-class="active"
            >
              <LockIcon class="w-6 h-6 transition-all ease-out" />
              <span class="ml-2 text-sm font-medium transition-all ease-out"
                >Change Password</span
              >
            </nuxt-link>
            <li>
              <button
                type="button"
                @click="logout"
                class="flex items-center w-full px-3 py-2 focus:outline-none focus-visible:underline"
              >
                <LogOutIcon class="w-6 h-6 transition-all ease-out" />
                <span
                  class="ml-2 text-sm font-medium text-gray-700 transition-all ease-out"
                  >Logout</span
                >
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import signOut from '~/gql/user/signOut.gql'
import {
  StopCircleIcon,
  HomeIcon,
  TruckIcon,
  LockIcon,
  LogOutIcon,
  UserIcon,
  PieChartIcon,
} from 'vue-feather-icons'
export default {
  computed: {
    ...mapGetters({ user: 'auth/user' }),
  },
  components: {
    StopCircleIcon,
    TruckIcon,
    HomeIcon,
    LockIcon,
    LogOutIcon,
    UserIcon,
    PieChartIcon,
  },
  methods: {
    async logout() {
      try {
        this.$store.commit('clearErr')
        await this.$apollo.mutate({
          mutation: signOut,
          fetchPolicy: 'no-cache',
        })
        this.$store.commit('busy', false)
        this.$router.push('/')
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
        this.$store.commit('busy', false)
      }
    },
  },
}
</script>

<style scoped>
.active {
  @apply h-10 w-full bg-white rounded-lg shadow ease-out transition-transform;
}
.active svg {
  @apply text-indigo-600;
}
.active span {
  @apply text-indigo-600;
}
.ease-in {
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
}
.ease-out {
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
}
.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-fastest {
  transition-duration: 75ms;
}
.transition-faster {
  transition-duration: 100ms;
}
.transition-fast {
  transition-duration: 150ms;
}
. {
  transition-duration: 200ms;
}
.transition-slow {
  transition-duration: 300ms;
}
.transition-slower {
  transition-duration: 500ms;
}
.transition-slowest {
  transition-duration: 700ms;
}

.transition-all {
  transition-property: all;
}
.transition-opacity {
  transition-property: opacity;
}
.transition-transform {
  transition-property: transform;
}

.focus-visible.focus-visible\:underline {
  text-decoration: underline;
}
</style>
