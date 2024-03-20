// nuxt.config.js/ts
export default defineNuxtConfig({
  css: [
    "@/assets/scss/main.scss",
    "cropperjs/dist/cropper.css",
    "vue-toast-notification/dist/theme-sugar.css"
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/config/variable.scss" as *;'
        }
      }
    }
  },

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
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-icon",
    "@vee-validate/nuxt",
    "@nuxt/image",
    "@nuxt/devtools",
    "@vueuse/nuxt",
    [
      '@vee-validate/nuxt',
      {
        // disable or enable auto imports
        autoImports: true,
        // Use different names for components
        componentNames: {
          Form: 'VeeForm',
        },
      }
    ]
  ],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      baseUrl: process.env.BASE_URL,
    }
  },

  imports: {
    dirs: ['types/**/*.ts', 'types/*.ts'],
  },

  devtools: {
    enabled: true,
  },
})
