import { join, resolve } from 'path'
import dotenv from 'dotenv'
const whitelistPatterns = [/(slick-+|swal2-)/]
dotenv.config({ path: resolve(process.cwd(), '../.env') })
const {
  HEAD,
  HTTP_ENDPOINT,
  WS_ENDPOINT,
  GOOGLE_ANALYTICS_ID,
  GOOGLE_MAPS_API_KEY,
} = require('./config')
// console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz', HTTP_ENDPOINT, GOOGLE_MAPS_API_KEY)
export const head = HEAD
export const components = true
export const mode = 'spa'
export const loading = '~/shared/components/ui/Loading.vue'
export const css = [
  '~/shared/assets/css/swal.css',
  '~/shared/assets/css/animations.css',
  '~/shared/assets/css/pulse.css',
  '~/shared/assets/css/badge.css',
]
export const plugins = [
  // { src: '~/shared/plugins/map.js', mode: 'client' },
  { src: '~/shared/plugins/VueYoutube.js', mode: 'client' },
  { src: '~/shared/plugins/swal.js', mode: 'client' },
  { src: '~/shared/plugins/ui.js' },
  { src: '~/shared/plugins/filters.js' },
  { src: '~/shared/plugins/init.js', mode: 'client' },
  { src: '~/shared/plugins/lazy.js', mode: 'client' },
  { src: '~/shared/plugins/scroll.js', mode: 'client' },
]
// nuxt-purgecss is required. else it will eliminate All styles used in ~/shared/components (which style is not used any where else)
export const buildModules = [
  '@nuxtjs/apollo',
  'vue-sweetalert2/nuxt',
  // "~/modules/routes",
  '@nuxtjs/robots',
  '@nuxtjs/proxy',
  '@nuxtjs/pwa',
  '@nuxtjs/toast',
  '@nuxtjs/tailwindcss',
  '@nuxt/components',
  'nuxt-purgecss',
]
export const webfontloader = {
  google: {
    families: ['Nunito:400,700&display=swap'],
  },
}
export const tailwindcss = {
  configPath: '~/shared/config/tailwind.config.js',
  cssPath: '~/shared/assets/css/tailwind.css',
  exposeConfig: false,
  config: {},
}
export const purgeCSS = {
  whitelistPatterns,
}
export const modules = ['cookie-universal-nuxt', '@nuxtjs/google-analytics']
// These 2 only used at www
export const pwa = {}
export const oneSignal = {}

export const googleAnalytics = {
  id: GOOGLE_ANALYTICS_ID,
}
export const apollo = {
  // watchLoading: '../shared/plugins/apollo-watch-loading-handler.js',
  // errorHandler: './plugins/apollo-error-handler.js',
  clientConfigs: {
    default: {
      httpEndpoint: '/graphql',
      wsEndpoint: WS_ENDPOINT + '/graphql',
    },
  },
  defaultOptions: {
    $query: {
      loadingKey: 'loading',
      fetchPolicy: 'cache-and-network',
    },
  },
}
export const toast = {
  theme: 'toasted-primary',
  position: 'bottom-center',
  singleton: true,
  fullWidth: true,
}
export const publicRuntimeConfig = {
  HTTP_ENDPOINT: process.env.HTTP_ENDPOINT,
  WS_ENDPOINT: process.env.WS_ENDPOINT,
}
export const proxy = {
  '/graphql': HTTP_ENDPOINT,
  '/api': HTTP_ENDPOINT,
  '/auth': HTTP_ENDPOINT,
  '/images': HTTP_ENDPOINT,
}
export const generate = {
  dir: 'dist',
  fallback: true,
}
