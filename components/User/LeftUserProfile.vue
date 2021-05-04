<template>
  <div
    class="fixed inset-0 z-50 flex flex-col w-5/6 max-w-sm overflow-x-hidden overflow-y-auto transition bg-white shadow-lg lg:z-0 lg:w-72 md:w-96 lg:relative"
  >
    <button
      aria-label="Open sidebar"
      @click="hideSidebar(null)"
      class="absolute right-0 inline-flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 lg:hidden focus:outline-none"
    >
      <svg
        class="w-5 h-5 text-primary-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <div class="max-w-full mt-4">
      <div v-if="!user">
        <div class="flex items-center justify-center w-full my-4 text-gray-600">
          <ul class="flex flex-col items-start justify-center w-full mx-auto">
            <!-- dashboard -->
            <li class="w-full">
              <nuxt-link
                @click.native="$emit('hideSidebar', true)"
                :to="localePath('/login')"
                exact-active-class="text-primary-500"
                class="flex flex-row w-full px-4 py-3 mx-auto ease-in-out transform border-white cursor-pointer border-s-4 md:border-white hover:bg-yellow-100 hover:text-primary-500 hover:border-primary-500 lg:hover:text-primary-500"
              >
                <div class="flex flex-row w-full">
                  <svg
                    class="w-6 h-6 my-auto me-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="tracking-wider">Login</span>
                </div>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="h-full mx-auto">
        <div class="flex justify-end lg:justify-center">
          <span
            class="flex flex-col items-center justify-center w-full py-10 border-b"
          >
            <div class="px-3">
              <img
                v-lazy="user.avatar"
                alt=""
                class="object-contain w-24 h-24 border rounded-full"
              />
            </div>
            <div
              v-if="user"
              class="flex flex-col my-auto mt-2 text-xl font-semibold text-color"
            >
              <span class="py-2 text-center">
                Hello, {{ user && user.firstName }}
              </span>
              <span class="text-sm font-normal text-center text-gray-400">
                {{ user.email }}
              </span>
            </div>
          </span>
        </div>
        <!-- megamenu -->
        <!-- <div v-if="megamenu.length > 0" class="pl-4 mt-4 lg:hidden">
          <FilterCategory :details="megamenu" class="w-full" />
        </div> -->

        <!-- <LeftOptions /> -->
        <div class="">
          <div
            class="flex items-center justify-center w-full my-4 text-gray-600"
          >
            <ul class="flex flex-col items-start justify-center w-full mx-auto">
              <!-- dashboard -->
              <li
                class="w-full"
                v-for="(i, ix) in dashboardMenuItems"
                :key="ix"
                v-if="i"
              >
                <nuxt-link
                  @click.native="$emit('hideSidebar', true)"
                  :to="localePath(i.link)"
                  exact-active-class="text-primary-500"
                  class="flex flex-row w-full px-4 py-3 mx-auto ease-in-out transform border-white cursor-pointer border-s-4 md:border-white hover:bg-yellow-100 hover:text-primary-500 hover:border-primary-500 lg:hover:text-primary-500"
                >
                  <h3 class="flex flex-row w-full">
                    <span
                      v-html="i.icon"
                      class="w-6 h-6 my-auto me-2 text-primary-500"
                    />
                    <span class="tracking-wider">{{ i.text }}</span>
                  </h3>
                </nuxt-link>
              </li>
              <!-- logout -->
              <li class="w-full">
                <button
                  @click="Logout"
                  type="button"
                  class="flex flex-row w-full px-5 py-3 mx-auto transition duration-300 ease-in-out transform border-white cursor-pointer focus:outline-none border-s-4 md:border-white hover:bg-yellow-100 hover:text-primary-500 hover:border-primary-500 lg:hover:text-primary-500"
                >
                  <svg
                    class="w-6 h-6 my-auto me-2 text-primary-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="tracking-wider">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import SIGNOUT from '~/gql/user/signOut.gql'
// import GET_MEGAMENU from '~/gql/category/megamenu.gql'
import FilterCategory from '~/components/Listing/FilterCategory'

export default {
  props: {
    show: { type: Boolean },
  },
  data() {
    return {
      dashboardMenuItems: [
        {
          link: '/my',
          text: 'Dashboard',
          description:
            'All Orders, tracking orders, return items, manage orders.',
          icon: `<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
              clip-rule="evenodd"
            />
          </svg>`,
        },
        {
          link: '/my/orders',
          text: 'My Orders',
          description:
            'All Orders, tracking orders, return items, manage orders.',
          icon: `<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
              clip-rule="evenodd"
            />
          </svg>`,
        },
        {
          link: '/my/profile',
          text: 'Profile Information',
          description:
            'Edit Login Details, password setup, Edit fisrt and last name, number',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                </svg>`,
        },
        {
          link: '/my/wishlist',
          text: 'Wishlist',
          description: 'Wishlist',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                 </svg>`,
        },
        {
          link: '/my/reviews',
          text: 'My Reviews',
          description: 'product reviews',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>`,
        },
        {
          link: '/my/manage-address',
          text: 'Manage Address',
          description: 'product reviews',
          icon: `<svg xmlns="http://www.w3.org/2000/svg"" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>`,
        },
        // {
        //   link: '/',
        //   text: 'Payments',
        //   description:
        //     'Edit login details, password setup, edit fist and last name, number.',
        //   icon: `<svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     fill="none"
        //     viewBox="0 0 24 24"
        //     stroke="currentColor"
        //   >
        //     <path
        //       stroke-linecap="round"
        //       stroke-linejoin="round"
        //       stroke-width="2"
        //       d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        //     />
        //   </svg>`,
        // },
        // {
        //   role: 'user',
        //   link: '/my/giftcards',
        //   text: 'Gift Cards',
        //   description: 'Manage GIft cards, use cards Redeem and refer to earn.',
        //   icon: `<svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     viewBox="0 0 20 20"
        //     fill="currentColor"
        //   >
        //     <path
        //       fill-rule="evenodd"
        //       d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
        //       clip-rule="evenodd"
        //     />
        //     <path
        //       d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"
        //     />
        //   </svg>`,
        // },
        // {
        //   role: 'admin',
        //   link: '/my/credits',
        //   text: 'Creadit Points',
        //   description:
        //     'Manage your earn points, redeem, share, refer to earn points.',
        //   icon: `<svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     fill="none"
        //     viewBox="0 0 24 24"
        //     stroke="currentColor"
        //   >
        //     <path
        //       stroke-linecap="round"
        //       stroke-linejoin="round"
        //       stroke-width="2"
        //       d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
        //     />
        //   </svg>`,
        // },
        // {
        //   role: 'user',
        //   link: '/my/profile',
        //   text: 'Notifications',
        //   description: 'Manage, delete, schedule your Notifications.',
        //   icon: `<svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     viewBox="0 0 20 20"
        //     fill="currentColor"
        //   >
        //     <path
        //       d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
        //     />
        //   </svg>`,
        // },
      ],
      // categories: [],
      selectedCategory: null,
      dashboard: false,
      profile: false,
      wishlist: false,
      card: false,
      review: false,

      signOut: {
        email: '',
        password: '',
      },
    }
  },
  components: {
    FilterCategory,
  },
  // async created() {
  //   await this.getCategories()
  // },
  methods: {
    ...mapMutations({ success: 'success', setErr: 'setErr' }),
    // async getCategories() {
    // console.log('get categories')
    // try {
    //   this.categories = (
    //     await this.$apollo.query({
    //       query: GET_MEGAMENU,
    //       variables: { level: 0 },
    //       fetchPolicy: 'no-cache',
    //     })
    //   ).data.megamenu
    //   // console.log(this.categories, 'categories')
    // } catch (e) {
    //   // console.log(e)
    // } finally {
    //   }
    // },
    ...mapActions({ logout: 'auth/logout' }),
    go(url) {
      this.$emit('hideSidebar', true)
      this.$router.push(url)
    },
    hideSidebar(e) {
      this.sidebar = false
      if (e) this.$router.push(`/c/${e}`)
      this.$emit('hideSidebar', true)
    },
    onSelectCategory(val) {
      this.selectedCategory = val
    },
    async Logout() {
      let msg = 'successfully logged out'
      try {
        await this.logout({ mutation: SIGNOUT })
        this.success(msg)
      } catch (e) {
      } finally {
      }
    },
  },
  computed: {
    ...mapGetters({ megamenu: 'megamenu' }),
    user() {
      return this.$store.state.auth.user
    },
  },
}
</script>
