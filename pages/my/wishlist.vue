<template>
  <Wishlist />
</template>
<script>
import Nav from '~/components/Home/Nav'

import LeftUserProfile from '~/components/User/LeftUserProfile'
import Wishlist from '~/components/User/Dashboard/Wishlist'
import Footer from '~/components/Footer'
export default {
  head() {
    return {
      title: 'My Wishlist',
    }
  },
  layout: 'account',
  middleware: ['isAuth'],
  components: {
    Nav,
    Footer,

    LeftUserProfile,
    Wishlist,
  },
}
</script>
