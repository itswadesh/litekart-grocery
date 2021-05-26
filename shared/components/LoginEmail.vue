<template>
  <div
    class="flex flex-col items-center h-screen p-4 text-center text-gray-500 bg-gray-200 md:justify-center"
  >
    <div class="w-full max-w-md p-5 bg-white rounded-lg shadow">
      <div class="max-w-sm mx-auto">
        <span class="text-xl font-bold text-secondary">
          SIGN IN
        </span>

        <SocialLogin class="my-5" />
        <div class="flex items-center pt-3">
          <hr class="w-full" />
          <span class="mx-5 text-sm font-semibold">or</span>
          <hr class="w-full" />
        </div>
        <form novalidate autocomplete="off" @submit.stop.prevent="submit()">
          <h3 class="mt-5">or signin with credentials</h3>
          <div class="my-5">
            <Textbox v-model="uid" label="Email" class="" />
            <Textbox
              v-model="password"
              name="password"
              label="Password"
              ref="password"
              type="password"
              class="w-full mt-5"
            />
            <div class="flex items-center justify-between text-xs">
              <div />
              <nuxt-link
                :to="`/account/forgot-password?email=${uid}`"
                class="mt-2"
                >Forgot Password?</nuxt-link
              >
            </div>
            <div class="flex items-center justify-between mt-5 space-x-4">
              <Submit class="w-1/2">Login</Submit>
              <nuxt-link
                to="/signup"
                class="w-1/2 py-2 font-semibold transition duration-300 transform rounded-md hover:bg-gray-200 hover:shadow-md active:scale-95"
              >
                Register now
              </nuxt-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Textbox, Submit } from "./ui";
import SocialLogin from "./SocialLogin";
export default {
  data() {
    return {
      loading: false,
      fadeIn: "",
      disable: "disable",
      msg: null,
      firstName: "",
      lastName: "",
    };
  },
  props: {
    uid: { type: String },
    password: { type: String },
  },
  components: { Textbox, SocialLogin, Submit },
  computed: {
    isEmail() {
      if (this.uid.includes("@")) return true;
      else return false;
    },
  },
  methods: {
    ...mapActions({
      login: "auth/login",
    }),
    async submit() {
      if (!this.uid || this.uid == "") {
        this.$store.commit("setErr", "Please enter your email");
        return;
      }
      if (!this.isEmail) {
        this.$store.commit("setErr", "Entered email is not valid");
        return;
      }
      this.emailLogin();
    },
    async emailLogin() {
      try {
        // this.$store.commit('clearErr')
        const data = await this.login({
          email: this.uid,
          password: this.password,
        });
        const redirect = this.$route.hash.substr(1) || "/";
        this.$router.push(redirect);
      } catch (e) {
        let msg;
        if (e.networkError) {
          if (!e.networkError.result) {
            if (
              e.networkError.message ==
              "Unexpected token E in JSON at position 0"
            )
              msg = "Unable to connect to server...";
            else msg = "Server is down.";
          } else if (e.networkError.result && e.networkError.result.errors) {
            e.networkError.result.errors.map(({ message }, i) => {
              msg = message;
            });
          } else {
            msg = e.networkError.toString();
          }
        } else if (e.graphQLErrors) {
          if (e.graphQLErrors.length < 1) {
            // state.errors.push('Server is down.')
            msg = message;
          } else {
            e.graphQLErrors.map(({ message }, i) => {
              msg = message;
            });
          }
          // console.log(state.errors)
        } else {
          msg = e;
        }
        if (msg == "You are already signed in.") {
          this.$router.push("/");
        } else {
        }
      }
    },
  },
};
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
