// nuxt.config.js/ts
export default defineNuxtConfig({
  css: [
    "bootstrap/scss/bootstrap.scss",
    "~/assets/css/main.scss"
  ],
  app: {
    head: {
      title: 'Story Time - Cagie',
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/images/icon.ico'
        }
      ]
    }
  },
  modules: [
    "@pinia/nuxt",
    "nuxt-icon",
    "@vee-validate/nuxt",
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL
    }
  }
})
