<template>
  <div>
    <Heading title="Verify Email" />
    <div class="text-center"></div>
  </div>
</template>
<script>
import { HeadingFlat } from '~/shared/components'
import verifyEmail from '~/gql/user/verifyEmail.gql'

export default {
  async created() {
    try {
      const v = (
        await this.$store.dispatch('auth/verifyEmail', {
          id: this.id,
          token: this.token,
          password: this.password,
          passwordConfirmation: this.password,
        })
      ).data.verifyEmail
      this.$router.push('/account/verification-success')
    } catch (e) {
      this.$store.commit('setErr', e)
    }
  },
  components: { HeadingFlat },
}
</script>
