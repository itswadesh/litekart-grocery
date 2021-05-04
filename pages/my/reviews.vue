<template>
  <ReviewAndRating />
</template>
<script>
import Nav from '~/components/Home/Nav'

import LeftUserProfile from '~/components/User/LeftUserProfile'
import ReviewAndRating from '~/components/User/Dashboard/ReviewAndRating'
import Footer from '~/components/Footer'
export default {
  head() {
    return {
      title: 'Reviews',
    }
  },
  layout: 'account',
  middleware: ['isAuth'],
  components: {
    Nav,
    Footer,

    LeftUserProfile,
    ReviewAndRating,
  },
}
</script>
