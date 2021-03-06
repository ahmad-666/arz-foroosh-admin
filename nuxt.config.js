import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'arz foroosh',
    htmlAttrs: {
      lang: 'fa',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/imgs/logo.png' }],
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
      dark: false,
      themes: {
        light: {
          primary: colors.teal.base,
          secondary: colors.amber.darken2,
          accent: colors.deepPurple.base,
          success: colors.teal.accent4,
          info: colors.blue.darken2,
          error: colors.red.base,
          warning: colors.yellow.accent4,
          backgroundColor: colors.grey.lighten3,
          cardColor: '#fff',
          titleColor: colors.grey.darken4,
          textColor: colors.grey.darken1,
        },
        dark: {
          primary: colors.teal.base,
          secondary: colors.amber.base,
          accent: colors.deepPurple.base,
          success: colors.teal.accent4,
          info: colors.blue.darken2,
          error: colors.red.base,
          warning: colors.yellow.accent4,
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
  router: { middleware: ['autoLogin'] },
  env: {},
  build: {
    transpile: ['num2persian'],
  },
}
