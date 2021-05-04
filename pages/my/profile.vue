<template>
  <div>
    <HeadingFlat>Personal Details</HeadingFlat>
    <div class="pb-4 mx-auto mb-20 text-center bg-white lg:w-1/3">
      <form
        class="mx-2 mb-1"
        novalidate
        autocomplete="off"
        @submit.stop.prevent="submit(profile)"
      >
        <div class="p-2" v-if="a">
          <Avatar
            :image="profile.avatar"
            name="avatar"
            folder="avatar"
            @remove="removeImage"
            @save="saveImage"
          />
          <div
            type="tel"
            label="Phone"
            class="w-full mb-4 text-center"
            name="name"
          >
            Phone: {{ a.phone }}
          </div>
          <div class="flex justify-between w-full mb-4">
            <Textbox
              label="First Name"
              class="w-1/2 mr-1"
              name="firstName"
              v-model="profile.firstName"
            />
            <Textbox
              label="Last Name"
              class="w-1/2 ml-1"
              name="lastName"
              v-model="profile.lastName"
            />
          </div>
          <Textbox
            label="Address"
            class="w-full mb-4"
            name="name"
            v-model="a.address"
          />
          <Textbox
            type="tel"
            label="Pin Code"
            class="w-full mb-4"
            name="name"
            v-model.number="a.zip"
          />
          <Textbox
            label="District"
            class="w-full mb-4"
            name="name"
            v-model="a.district"
          />
          <div class="flex justify-between w-full mb-4">
            <Textbox
              label="City"
              class="w-1/2 mr-1"
              name="name"
              v-model="a.city"
            />
            <v-select
              :options="states.data"
              label="name"
              :reduce="(s) => s.name"
              v-model="a.state"
              placeholder="Select State"
              class="mb-4"
            />
          </div>
        </div>
        <div
          class="relative bottom-0 flex justify-between w-full shadow lg:shadow-none"
        >
          <button
            type="button"
            @click="$router.push('/my/orders')"
            class="w-1/2 p-3 text-sm font-semibold tracking-widest text-black bg-white lg:rounded"
          >
            CANCEL
          </button>
          <button
            type="submit"
            class="w-1/2 p-3 text-sm font-semibold tracking-widest primary lg:rounded"
          >
            CONTINUE
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import { Avatar, HeadingFlat } from '~/shared/components'
import { Textbox, Checkbox } from '~/shared/components/ui'
import me from '~/gql/user/me.gql'
import vSelect from 'vue-select'
import GET_STATES from '~/gql/state/states.gql'

import { location } from '~/shared/mixins'
export default {
  middleware: ['isAuth', 'geo'],
  mixins: [location],
  data() {
    return {
      a: {},
      profile: {},
      nwErr: null,
      graphErr: null,
      states: {},
    }
  },
  components: {
    HeadingFlat,
    Textbox,
    Checkbox,
    Avatar,
    vSelect,
  },
  async mounted() {
    try {
      this.states = (
        await this.$apollo.query({ query: GET_STATES })
      ).data.states
    } catch (e) {
      this.$store.commit('setErr', e)
    } finally {
      this.$store.commit('busy', false)
    }
    try {
      this.$store.commit('busy', true)
      const user = (
        await this.$apollo.query({ query: me, fetchPolicy: 'no-cache' })
      ).data.me

      this.profile = { ...user }
      this.a = this.$cookies.get('geo')
      this.profile.address = this.profile.address || {}
      this.a.address =
        this.profile.address.address || (this.a && this.a.address)
      this.a.district =
        this.profile.address.district || (this.a && this.a.district)
      this.a.city = this.profile.address.city || (this.a && this.a.city)
      this.a.zip = +(this.profile.address.zip || (this.a && this.a.zip))
      this.a.firstName =
        this.profile.address.firstName ||
        this.profile.firstName ||
        (this.a && this.a.firstName)
      this.a.lastName =
        this.profile.address.lastName ||
        this.profile.lastName ||
        (this.a && this.a.lastName)
      this.a.phone = this.profile.phone || (this.a && this.a.phone)
    } catch (e) {
      this.$store.commit('setErr', e)
    } finally {
      this.$store.commit('busy', false)
    }
  },
  methods: {
    saveImage(name, image) {
      this.profile.avatar = image
      this.saveProfile()
    },
    removeImage(name) {
      this.profile.avatar = ''
      this.saveProfile()
    },
    ...mapActions({
      updateProfile: 'auth/updateProfile',
    }),
    go(url) {
      this.$router.push(url)
    },
    submit() {
      try {
        this.saveProfile()
        this.$router.push('/my/orders')
      } catch (e) {}
    },
    async saveProfile() {
      try {
        this.$store.commit('busy', true)
        // this.profile.address = this.a
        delete this.profile.address.__typename
        delete this.profile.info.__typename
        delete this.profile.address
        return await this.updateProfile(this.profile)
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
        this.$store.commit('busy', false)
      }
    },
  },
  layout: 'account',
}
</script>

<style scoped>
/* form */
form {
  display: inline-block;
}
.field {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
}
label {
  order: -1;
  padding-left: 5px;
  font-size: 14px;
  transition: all 0.3s ease-in;
  transform: translateY(30px);
  pointer-events: none;
}
input:focus + label,
textarea:focus + label {
  transform: translateY(16px);
}
/* form ends */
</style>
