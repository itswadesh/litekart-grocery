<template>
  <div class="z-0">
    <UserLogin />
  </div>
</template>

<script>
import UserLogin from '~/components/Login/Email/UserLogin'
export default {
  head() {
    return {
      title: 'Login',
    }
  },
  components: { UserLogin },
}
</script>
