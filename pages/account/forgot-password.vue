<template>
  <div
    class="flex flex-col items-center h-screen p-4 text-center text-gray-500 bg-gray-200 md:justify-center"
  >
    <div class="w-full max-w-md p-5 bg-white rounded-lg shadow">
      <div class="max-w-sm mx-auto">
        <span class="text-xl font-bold text-secondary">
          FORGOT PASSWORD
        </span>

        <hr class="mt-5" />

        <form novalidate autocomplete="off" @submit.stop.prevent="submit()">
          <h3 class="mt-5">we will email you the password reset link</h3>
          <div class="my-5">
            <Textbox v-model="email" label="Email" class="" />

            <div class="flex items-center justify-between mt-5 space-x-4">
              <Submit class="w-1/2">Send email</Submit>
              <nuxt-link
                to="/login"
                class="w-1/2 py-2 font-semibold transition duration-300 transform rounded-md hover:bg-gray-200 hover:shadow-md active:scale-95"
              >
                Back to login
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
import { Heading } from "~/shared/components";
import { Textbox, Submit } from "~/shared/components/ui";
export default {
  data() {
    return { email: this.$route.query.email };
  },
  components: { Heading, Textbox, Submit },
  created() {
    this.$store.commit("busy", false);
  },
  methods: {
    ...mapActions({
      emailPassword: "auth/emailPassword",
    }),
    async submit() {
      try {
        const data = await this.emailPassword({
          email: this.email,
        });
        this.$router.push("/account/forgot-success");
      } catch (e) {
        this.$store.commit("setErr", e);
      }
    },
  },
  layout: "none",
};
</script>

<style></style>
