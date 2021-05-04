<template>
  <div>
    <Heading title="Password Reset" />
    <div class="text-center">
      <div class="flex justify-center py-6">
        <img src="/password-changed.svg" class="h-40 w-40 rounded-full" />
      </div>
      <div class="text-2xl py-4">
        Password reset link sent to your email successfully
      </div>
    </div>
  </div>
</template>
<script>
import { Heading } from '~/shared/components'
import order from '~/gql/order/order.gql'

export default {
  components: { Heading },
}
</script>
