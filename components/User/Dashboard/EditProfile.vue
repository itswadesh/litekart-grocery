<template>
  <div class="w-full h-full">
    <form
      novalidate
      autocomplete="off"
      @submit.stop.prevent="submit"
      v-if="profile"
      class="w-full text-gray-500 bg-white rounded-lg shadow lg:mx-auto lg:container"
    >
      <div
        class="container w-full p-5 pb-5 mx-auto text-lg font-normal text-gray-700 border-b"
      >
        Profile Details
      </div>
      <div
        class="w-full px-5 pt-6 space-y-6 text-base font-light md:px-12 lg:px-20"
      >
        <Textbox
          placeholder="First Name"
          class="w-full px-3"
          v-model="profile.firstName"
          required
          autofocus
          :v="$v.profile.firstName"
          :err="
            $v.profile.firstName.$invalid && $v.profile.firstName.$dirty
              ? 'First Name is required'
              : ''
          "
        />
        <Textbox
          placeholder="Last Name"
          class="w-full px-3"
          v-model="profile.lastName"
          required
        />
        <Textbox
          placeholder="Email"
          class="w-full px-3"
          v-model="profile.email"
          required
        />
        <div class="flex flex-row pl-4 mb-5">
          <div class="me-5">Gender:</div>
          <div class="flex">
            <label class="flex flex-row me-4">
              <Radio
                v-model="profile.gender"
                id="one"
                value="Male"
                name="group"
                class="my-auto"
              />
              <span class="my-auto text-gray-600 ms-2">Male</span>
            </label>
            <label class="flex flex-row">
              <Radio
                v-model="profile.gender"
                id="one"
                value="Female"
                name="group"
                class="my-auto"
              />
              <span class="my-auto text-gray-600 ms-2">Female</span>
            </label>
          </div>
        </div>
      </div>
      <div class="flex justify-end px-5 md:px-12 lg:px-20">
        <!--  -->
        <Button
          class="w-full p-3 my-6 md:px-6 md:p-2 md:w-1/3 sm:w-1/2 sm:mt-10 bg-secondary-500 focus:ring-secondary-500"
          type="submit"
          :disabled="$v.profile.$anyError && $v.profile.$anyDirty"
          >UPDATE
        </Button>
        <!-- <button
          type="submit"
          :disabled="$v.profile.$anyError && $v.profile.$anyDirty"
          class="md:w-1/3 sm:w-1/2 w-full p-3 my-6 sm:mt-10 hover:-translate-y-0.5 transition transform text-lg text-center text-white uppercase ease-in-out rounded shadow bg-secondary-500 hover:opacity-80 focus:ring focus:ring-offset-2 focus:ring-secondary-500 focus:outline-none md:px-6 md:p-2"
        >
          UPDATE
        </button> -->
      </div>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Button } from '~/shared/components/ui'
import { Textbox, Radio } from '~/shared/components/ui'
import UPDATE_PROFILE from '~/gql/user/updateProfile.gql'
import ME from '~/gql/user/me.gql'
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
export default {
  components: { Textbox, Radio, Button },
  data() {
    return {
      profile: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: '',
        address: '',
      },
    }
  },
  mixins: [validationMixin],
  validations: {
    profile: {
      firstName: { required },
    },
  },
  async created() {
    await this.getMe()
  },
  methods: {
    ...mapMutations({ success: 'success', setErr: 'setErr' }),
    async getMe() {
      try {
        this.profile = (
          await this.$apollo.query({
            query: ME,
            fetchPolicy: 'no-cache',
          })
        ).data.me
      } catch (e) {
        // console.log(e)
      } finally {
      }
    },
    async submit() {
      // console.log("update profile", this.profile)
      let msg = 'Profile Updated'
      delete this.profile.__typename
      delete this.profile.info
      delete this.profile.address
      try {
        const data = (
          await this.$apollo.mutate({
            mutation: UPDATE_PROFILE,
            variables: this.profile,
          })
        ).data.updateProfile
        this.success(msg)
        let r = this.$route.query.ref || '/'
        this.$router.push(r)
      } catch (e) {
        // console.log(e)
      } finally {
      }
    },
  },
}
</script>
