<template>
  <div>
    <button @click="drawBoundries()">Try It</button>
    <p id="map"></p>
  </div>
</template>

<script>
import Vue from 'vue'
import { location } from '~/shared/mixins'
export default {
  mixins: [location],
}
</script>

<style scoped>
#map {
  width: 500px;
  height: 500px;
}
</style>
