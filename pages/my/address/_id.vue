<template>
  <div>
    <HeadingFlat>Add Address</HeadingFlat>
    <AddressEdit :id="$route.params.id" />
  </div>
</template>
<script>
import { AddressEdit, HeadingFlat } from '~/shared/components'

export default {
  components: { AddressEdit, HeadingFlat },
  layout: 'account',
}
</script>
