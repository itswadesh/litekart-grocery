d
<template>
  <div>
    <HeadingFlat>Password Reset</HeadingFlat>
    <div class="text-center">
      <div class="flex justify-center py-6">
        <img
          src="/password-changed.svg"
          alt=""
          class="h-40 w-40 rounded-full"
        />
      </div>
      <div class="text-2xl py-4">Password successfully changed</div>
      <nuxt-link
        to="/my"
        class="inline-block primary px-6 py-2 my-3 rounded-full"
      >
        Back to profile
      </nuxt-link>
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
