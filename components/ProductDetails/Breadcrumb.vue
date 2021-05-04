<template>
  <div class="flex flex-row my-auto text-sm font-thin">
    <nuxt-link :to="localePath('/')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 my-auto text-gray-500 cursor-pointer me-1 hover:text-primary-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
        />
      </svg>
    </nuxt-link>
    >
    <nuxt-link
      v-for="(p, ix) in path"
      :key="ix"
      :to="`/c/${p.slug}`"
      v-if="p"
      class="my-auto capitalize cursor-pointer ms-1 hover:text-primary-500"
    >
      {{ p.name }} >
    </nuxt-link>

    <span class="my-auto capitalize truncate text-accent-800 ms-1">
      {{ name }}
    </span>
  </div>
</template>

<script>
export default {
  props: { path: { type: Array }, name: { type: String } },
}
</script>

<style></style>
