<template>
  <div>
    <div class="container w-full">
      <div class="text-center text-gray-700">
        <img
          class="w-full mx-auto sm:w-1/2"
          v-lazy="'/default_images/no-search-result.png'"
          alt=""
        />
        <div class="headings">We are unable to find items matching</div>
        <div class="text-center text-1">{{ $route.query.q }}</div>
      </div>
    </div>
    <div class="flex w-full text-center shadow-md">
      <MegamenuMobile />
    </div>
  </div>
</template>

<script>
import MegamenuMobile from '~/components/MegamenuMobile'
export default {
  components: { MegamenuMobile },
}
</script>
