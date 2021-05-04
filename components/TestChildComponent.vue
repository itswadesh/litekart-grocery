<template>
  <div>
    <span @click="val = 'khuranba'"> khui </span>
  </div>
</template>

<script>
export default {
  mounted() {
    // console.log(this.val)
  },
  props: {
    val: {
      type: String,
    },
  },
}
</script>
