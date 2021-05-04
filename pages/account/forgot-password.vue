<template>
  <div class="bg-gray-200 h-screen flex flex-col items-center justify-center">
    <div class="lg:w-1/3 w-full px-4">
      <div class="bg-white rounded shadow">
        <div class="text-secondary text-white">
          <h1 class="text-xl mb-2 text-center p-3">
            <span class="font-extrabold">FORGOT</span> PASSWORD
          </h1>
        </div>
        <hr />
        <form
          novalidate
          autocomplete="off"
          @submit.stop.prevent="submit()"
          class="center my-8"
        >
          <h3 class="text-center text-gray-500">
            we will email you the password reset link
          </h3>
          <div class="p-6">
            <Textbox v-model="email" label="Email" class="bg-gray-200 mb-4" />
            <div class="flex-col items-center justify-between mt-6">
              <Submit :loading="$store.state.loading">Send email</Submit>
              <div class="text-xs mt-2 flex justify-between">
                <nuxt-link to="/login">Back to login</nuxt-link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Heading } from '~/shared/components'
import { Textbox, Submit } from '~/shared/components/ui'
export default {
  data() {
    return { email: this.$route.query.email }
  },
  components: { Heading, Textbox, Submit },
  created() {
    this.$store.commit('busy', false)
  },
  methods: {
    ...mapActions({
      emailPassword: 'auth/emailPassword',
    }),
    async submit() {
      try {
        const data = await this.emailPassword({
          email: this.email,
        })
        this.$router.push('/account/forgot-success')
      } catch (e) {
        this.$store.commit('setErr', e)
      }
    },
  },
  layout: 'none',
}
</script>

<style></style>
