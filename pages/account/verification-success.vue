<template>
  <div>
    <Heading title="Verification success" />
    <div class="text-center">
      <div class="flex justify-center py-6">
        <img src="/password-changed.svg" class="h-40 w-40 rounded-full" />
      </div>
      <div class="text-2xl py-4">Account successfully verified</div>
      <nuxt-link
        to="/login"
        class="inline-block primary px-6 py-2 my-3 rounded-full"
        >You may login now</nuxt-link
      >
    </div>
  </div>
</template>
<script>
import { HeadingFlat } from '~/shared/components'
import order from '~/gql/order/order.gql'

export default {
  components: { HeadingFlat },
}
</script>
