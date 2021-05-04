<template>
  <div>
    <Heading title="Feedback" />
    <form
      novalidate
      autocomplete="off"
      @submit.stop.prevent="submit(message)"
      class="mx-2"
    >
      <Textarea v-model="message" ref="message" label="Message" />
      <Submit class="mt-10">Send</Submit>
    </form>
  </div>
</template>

<script>
import { Textbox, Submit, Textarea } from '~/shared/components/ui'
import { Heading } from '~/shared/components'
import saveMessage from '~/gql/product/saveMessage.gql'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      message: '',
    }
  },
  computed: {
    ...mapGetters({ user: 'auth/user', loading: 'loading' }),
  },
  components: { Heading, Textbox, Textarea, Submit },
  methods: {
    async submit(message) {
      if (message == '') {
        this.$store.commit('setErr', 'Can not send blank message')
        // this.$nextTick(() => this.$refs.message.focus())
        return
      }
      try {
        this.$store.commit('clearErr')
        if (!this.user) return this.$router.push('/login')
        await this.$apollo.mutate({
          mutation: saveMessage,
          variables: { body: message },
        })
        this.message = ''
        // this.getData()
        this.$store.commit('success', 'Message sent successfully')
        this.$router.push('/')
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

<style scoped></style>
