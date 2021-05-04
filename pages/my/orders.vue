<template>
  <MyOrder />
  <!-- <Footer class="absolute bottom-0 hidden md:flex" /> -->
</template>
<script>
import Nav from '~/components/Home/Nav'

import Megamenu from '~/components/Home/Megamenu'
import MyOrder from '~/components/Order/MyOrder'

import Footer from '~/components/Footer'

export default {
  head() {
    return {
      title: 'Order Details',
    }
  },
  middleware: ['isAuth'],
  layout: 'account',
  components: {
    Nav,
    Megamenu,
    MyOrder,

    Footer,
  },
}
</script>
