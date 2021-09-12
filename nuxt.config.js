import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - arz foroosh',
    title: 'arz foroosh',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/global.scss', '~/assets/styles/quill.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/quill.js', mode: 'client' },
    { src: '~/plugins/dateTimePicker.js', mode: 'client' },
    { src: '~/plugins/lottie.js', mode: 'client' },
    { src: '~/plugins/vue-slider-component.js', mode: 'client' },
    { src: '~/plugins/mask.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    // '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/styles/vuetify/_variables.scss'],
    breakpoint: {
      thresholds: {
        xs: 500,
        sm: 750,
        md: 1100,
        lg: 1500,
      },
      mobileBreakpoint: 'sm',
      scrollBarWidth: 16,
    },
    treeShake: true,
    rtl: true,
    theme: {
      dark: true,
      themes: {
        light: {
          primary: colors.deepPurple.base,
          secondary: colors.amber.darken2,
          accent: colors.cyan.accent4,
          success: colors.teal.accent4,
          info: colors.blue.darken2,
          error: colors.red.base,
          warning: colors.orange.accent3,
          backgroundColor: '#F5F6FA',
          cardColor: '#fff',
          titleColor: '#1d253b',
          textColor: '#9a9a9a',
        },
        dark: {
          primary: colors.deepPurple.base,
          secondary: colors.amber.darken2,
          accent: colors.cyan.accent4,
          success: colors.teal.accent4,
          info: colors.blue.darken2,
          error: colors.red.base,
          warning: colors.orange.accent3,
          backgroundColor: '#1E1E2F',
          cardColor: '#27293D',
          titleColor: '#fff',
          textColor: '#9a9a9a',
        },
      },
    },
  },
  loading: {
    color: '#ffa500',
    failedColor: 'crimson',
    height: '5px',
    rtl: false,
  },
  env: {},
  router: {}, // we execute this middleware before all routes
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['num2persian'],
  },
}
