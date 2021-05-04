<template>
  <div class="bg-gray-200 h-screen flex flex-col items-center justify-center">
    <div class="lg:w-1/3 w-full px-4">
      <div class="bg-white rounded shadow">
        <div class="text-secondary text-white">
          <h1 class="text-xl mb-2 text-center p-3">
            <span class="font-extrabold">CHANGE</span> PASSWORD
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
            Enter a new password for your account
          </h3>
          <div class="p-6">
            <Textbox
              label="Old Password"
              name="password"
              type="password"
              v-model="oldPassword"
              autofocus
            />
            <br />
            <Textbox
              label="New Password"
              name="password"
              type="password"
              v-model="password"
              autofocus
            />
            <div class="flex-col items-center justify-between mt-6">
              <Submit>Change Password</Submit>
              <div class="text-xs mt-2 flex justify-between">
                <nuxt-link to="/my/orders">Back to orders</nuxt-link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Heading } from '~/shared/components'
import { Textbox, Submit } from '~/shared/components/ui'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      oldPassword: '',
      password: '',
    }
  },
  computed: {
    ...mapGetters({ loading: 'loading' }),
  },
  created() {
    this.$store.commit('busy', false)
  },
  methods: {
    async submit() {
      try {
        await this.$store.dispatch('auth/changePassword', {
          oldPassword: this.oldPassword,
          password: this.password,
          passwordConfirmation: this.password,
        })
        this.$router.push('/account/change-success')
      } catch (e) {
        this.$store.commit('setErr', e)
      }
    },
  },
  components: { Heading, Textbox, Submit },
}
</script>
