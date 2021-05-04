<template>
  <div class>
    <AccountMenu class="md:hidden" />
    <!-- <GeoLocation /> -->
  </div>
</template>

<script>
import Vue from 'vue'
import { GeoLocation } from '~/shared/components/'
import AccountMenu from '~/components/AccountMenu'
export default {
  components: { AccountMenu, GeoLocation },
  middleware: ['isAuth'],
  layout: 'account',
}
</script>
