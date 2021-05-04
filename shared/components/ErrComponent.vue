<template>
  <div v-if="error" class="err">
    <div
      v-if="
        error.message ==
        'Network error: Unexpected token E in JSON at position 0'
      "
    >
      Unable to connect to server
    </div>
    <!-- Has to be error.graphQLErrors[0].message else it will add GraphQL err string -->
    <div v-else>
      <div v-for="(e, ix) in error.graphQLErrors" :key="ix">
        {{ e.message }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['error'],
}
</script>
