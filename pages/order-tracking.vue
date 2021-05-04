<template>
  <div>
    <div></div>
    <div class="container pb-5 mx-auto">
      <Tracking />
    </div>
  </div>
</template>

<script>
import Tracking from '~/components/Order/Tracking'
export default {
  head() {
    return {
      title: 'Order Tracking',
    }
  },
  middleware: ['isAuth'],
  components: { Tracking },
}
</script>
