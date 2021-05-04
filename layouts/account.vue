<template>
  <div>
    <Nav class="hidden lg:block" />
    <div
      class="flex flex-wrap justify-center w-full min-h-screen overflow-x-hidden antialiased bg-gray-100"
    >
      <AccountMenu class="hidden mt-16 md:block" />
      <div class="flex-1">
        <nuxt class="mt-0 lg:mt-20" />
      </div>
    </div>
    <StickyFooter class="mt-20" />
  </div>
</template>

<script>
import { Error } from '~/shared/components'
import { Loading } from '~/shared/components/ui'
import StickyFooter from '~/components/StickyFooter'
import Nav from '~/components/Nav'
import AccountMenu from '~/components/AccountMenu'
import { mapGetters } from 'vuex'
export default {
  middleware: ['geo'],
  components: { Error, Nav, StickyFooter, AccountMenu, Loading },
  computed: {
    ...mapGetters({ user: 'auth/user' }),
  },
}
</script>
