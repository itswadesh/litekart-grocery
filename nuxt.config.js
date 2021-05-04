import { join, resolve, basename } from 'path'
import { I18N } from './config/lang'
import { firebaseConfig } from './config/firebase'
import {
  HTTP_ENDPOINT,
  ONESIGNAL_APP_ID,
  WWW_URL,
  head,
  dev,
  tailwindcss,
  PORT,
  GOOGLE_ANALYTICS_ID,
} from './shared/config/index'
console.log('WWW_URL............', WWW_URL)
// const whitelist = ['preview-img-item']
const whitelistPatterns = [/(slick-+|swal2-)/]
export default {
  server: {
    host: '0.0.0.0',
    port: PORT,
  },
  head,
  css: ['~/shared/assets/css/form.css', '~/shared/assets/css/animations.css'],
  plugins: [
    { src: '~/plugins/ripple.js', ssr: false },
    { src: '~/plugins/lazy.js', ssr: false },
    { src: '~/plugins/slick.js' },
    { src: '~/plugins/scroll.js', ssr: false },
    { src: '~/plugins/filters.js' },
    { src: '~/plugins/vue-simple-photoswipe.js', ssr: false },
    { src: '~/plugins/VueYoutube.js', ssr: false },
    // { src: '~/plugins/agora.js', ssr: false },
    { src: '~/plugins/dir', ssr: true },
    // { src: '~/plugins/init', ssr: false },
    // { src: '~/plugins/directives.js', ssr:false },
  ],
  components: true,
  buildModules: [
    '@nuxtjs/apollo',
    '@nuxtjs/tailwindcss',
    'nuxt-purgecss',
    'nuxt-webfontloader',
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa',
    'vue-social-sharing/nuxt',
    // 'nuxt-vite',
  ],
  modules: [
    '@nuxtjs/robots',
    '@nuxtjs/toast',
    '@nuxtjs/proxy',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    'cookie-universal-nuxt',
    'vue-sweetalert2/nuxt',
    ['nuxt-i18n', I18N],
    ['@nuxtjs/firebase', firebaseConfig],
  ],
  pageTransition: 'slide-bottom',
  layoutTransition: 'slide-bottom',
  toast: {
    singleton: true,
  },
  purgeCSS: {
    // whitelist,
    whitelistPatterns,
  },
  tailwindcss,
  googleAnalytics: {
    id: GOOGLE_ANALYTICS_ID,
  },
  webfontloader: {
    google: {
      families: ['Nunito:400,700&display=swap'],
    },
  },
  axios: {
    proxy: true,
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: `${WWW_URL}/graphql`,
        browserHttpEndpoint: '/graphql',
        // wsEndpoint: server.replace('http', 'ws') + '/graphql',
      },
    },
    defaultOptions: {
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
      },
    },
  },
  proxy: {
    '/graphql': HTTP_ENDPOINT,
    '/api': HTTP_ENDPOINT,
    '/auth': HTTP_ENDPOINT,
  },
  build: {
    babel: {
      presets({ isServer }) {
        const targets = isServer ? { node: 'current' } : { ie: 11 }
        return [[require.resolve('@babel/preset-env'), { targets }]]
      },
      plugins: [
        '@babel/syntax-dynamic-import',
        '@babel/transform-runtime',
        '@babel/transform-async-to-generator',
      ],
    },
    parallel: true,
  },
}
