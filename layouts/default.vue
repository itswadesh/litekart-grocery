<template>
  <div style class="antialiased">
    <div class="mask" v-if="settings && settings.closed">
      <h1 class="p-8 text-xl text-red-500 bg-gray-900">
        {{ settings.closedMessage }}
      </h1>
    </div>
    <!-- <Loading /> -->
    <!-- <ErrComponent/> -->
    <Nav />
    <!-- <div
      class="flex items-center flex-none order-2 text-sm lg:block xs:justify-between text-gray"
    >-->
    <!-- </div> -->
    <div class="flex flex-col min-h-screen">
      <!-- <Megamenu class="mt-20" /> -->
      <nuxt class="mt-24 md:mt-16" />
    </div>
    <BackToTopDark />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Megamenu from '~/components/Megamenu'
import { Loading, BackToTopDark } from '~/shared/components/ui'
import { Header } from '~/shared/components'
import Nav from '~/components/Nav'

export default {
  // middleware: ['geo'],
  components: { Header, BackToTopDark, Loading, Nav, Megamenu },
  computed: {
    ...mapGetters({ settings: 'settings' }),
  },
}
</script>
