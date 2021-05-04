<template>
  <div v-show="isEnabled">
    <v-breadcrumbs divider="/">
      <v-breadcrumbs-item
        v-for="item in items"
        :key="item.text"
        :disabled="item.disabled"
      >
        <div @click="go(item.url)">{{ t(item.text) }}</div>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
  </div>
</template>

<script>
export default {
  props: ['items'],
  data: () => ({
    isEnabled: true,
  }),
  methods: {
    go(url) {
      this.$router.push(url)
    },
  },
}
</script>
