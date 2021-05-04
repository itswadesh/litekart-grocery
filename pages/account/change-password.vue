<template>
  <ChangePassword />
</template>

<script>
import { ChangePassword } from '~/shared/components'

export default {
  components: { ChangePassword },
  head() {
    return {
      title: 'Change Password',
    }
  },
  layout: 'account',
}
</script>
