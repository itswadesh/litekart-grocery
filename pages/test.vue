<template>
  <div>
    <div class="font-thin">ultralight: font-thin:100</div>
    <div class="font-extralight">extralight: font-extralight:200</div>
    <div class="font-light">light: font-light:300</div>
    <div class="font-normal">normal: font-normal:400</div>
    <div class="font-medium">medium: font-medium:500</div>
    <div class="font-semibold">semibold: font-semibold:600</div>
    <div class="font-bold">bold: font-thin:bold</div>
    <div class="font-extrabold">extrabold: font-extrabold:800</div>
    <div class="font-black">black: font-black:900</div>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div
      class="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        content
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
export default {
  layout: 'none',
  components: {
    vSelect,
  },
  data() {
    return {
      options: [],
      chosen: '',
    }
  },
  methods: {
    async onSearch(search, loading) {
      if (search.length) {
        loading(true)
        await this.search(loading, search, this)
        loading(false)
      }
    },
    search: async (loading, search, vm) => {
      vm.options = (
        await vm.$axios.$get(`/api/products/autocomplete?q=${escape(search)}`)
      ).data.map((d) => {
        return d._source
      })
    },
  },
  mounted() {},
}
</script>

<style></style>
