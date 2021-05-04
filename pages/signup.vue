<template>
  <div class="bg-gray-200 h-screen flex flex-col items-center justify-center">
    <div class="lg:w-1/3 w-full px-4">
      <div class="bg-white rounded shadow">
        <div class="text-secondary text-white">
          <h1 class="text-xl mb-2 text-center p-3">
            <span class="font-extrabold">SIGN UP</span> WITH
          </h1>
        </div>
        <!-- How to attach referrer -->
        <SocialLogin />
        <hr />
        <form
          novalidate
          autocomplete="off"
          @submit.stop.prevent="submit()"
          class="center my-8"
        >
          <h3 class="text-center text-gray-500">or signin with credentials</h3>
          <div class="p-6">
            <Textbox v-model="uid" label="Email" class="bg-gray-200 mb-4" />
            <Textbox
              v-model="password"
              name="password"
              label="Password"
              ref="password"
              type="password"
              class="w-full bg-gray-200 mb-4"
            />
            <div class="text-right">
              <span class="text-xs"></span>
            </div>
            <div class="flex">
              <Textbox
                v-model="firstName"
                label="Fisrt Name"
                class="w-1/2 bg-gray-200 mr-2"
              />
              <Textbox
                v-model="lastName"
                label="Last Name"
                class="w-1/2 bg-gray-200"
              />
            </div>
            <div class="flex items-center justify-between mt-6">
              <nuxt-link class="text-xs mr-8" to="/login">Login</nuxt-link>
              <Submit>Sign Up</Submit>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Textbox, Submit } from '~/shared/components/ui'
import { SocialLogin } from '~/shared/components'
export default {
  middleware: ['isGuest'],
  data() {
    return {
      loading: false,
      fadeIn: '',
      disable: 'disable',
      msg: null,
      uid: '',
      password: '',
      passwordConfirmation: '',
      firstName: '',
      lastName: '',
    }
  },
  components: { Textbox, SocialLogin, Submit },
  computed: {
    ...mapGetters({ settings: 'settings' }),
    isEmail() {
      if (this.uid.includes('@')) return true
      else return false
    },
  },
  methods: {
    ...mapActions({
      register: 'auth/register',
    }),
    async submit() {
      if (!this.uid || this.uid == '') {
        this.$store.commit('setErr', 'Please enter your email')
        return
      }
      if (!this.isEmail) {
        this.$store.commit('setErr', 'Entered email is not valid')
        return
      }
      this.emailSignup()
    },
    async emailSignup() {
      try {
        const data = await this.register({
          email: this.uid,
          password: this.password,
          passwordConfirmation: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          referrer: this.$route.query.referrer,
        })
        this.$router.push('/')
      } catch (e) {
        this.$store.commit('setErr', e)
      }
    },
  },
  layout: 'none',
  head() {
    return {
      title: 'Login to ' + this.settings.websiteName,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Login to ' + this.settings.websiteName,
        },
        {
          hid: 'og:description',
          name: 'Description',
          property: 'og:description',
          content: 'Login to ' + this.settings.websiteName,
        },

        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: 'Checkout with the products in your cart',
        },
        // Twitter
        {
          name: 'twitter:title',
          content: 'Checkout with the products in your cart',
        },
        {
          name: 'twitter:description',
          content: 'Login to ' + this.settings.websiteName,
        },
      ],
    }
  },
}
</script>
<style scoped>
.border-t {
  border-bottom: 1px solid lightgray;
}
.container {
  max-height: 80vh !important;
  min-height: 80vh !important;
}
.wraper-hide {
  visibility: hidden;
}
.border-t {
  border-bottom: 1px solid lightgray;
}
.big-button {
  background: linear-gradient(87deg, #fb6340, #da1c5f) !important;
  border-color: #fb6340;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.otp-container .otp-seperator {
  background-color: #dfe1e6;
  border: 1px solid #dfe1e6;
}
.otp-container #wraper1 {
  top: 20px;
  left: 28px;
}
.otp-container #wraper2 {
  top: 20px;
  left: 51px;
}
.otp-container #wraper3 {
  top: 20px;
  left: 76px;
}
.otp-container #wraper4 {
  top: 20px;
  left: 100px;
}
.otp-container .otp-content {
  letter-spacing: 15px;
  border: 1px solid transparent;
}
input + label {
  position: relative;
  z-index: 999;
}
</style>
