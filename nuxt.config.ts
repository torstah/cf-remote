// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui'
  ],
  ui: {
    global: false,
    icons: false,
    notifications: {
      // Only include notifications/toast functionality
      position: 'top-right',
      duration: 2000
    }
  },
  colorMode: {
    preference: 'dark'
  },
  app: {
    head: {
      title: 'UE5 Game Controller',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    },
    baseURL: '/'
  },
  nitro: {
    preset: 'node-server'
  },
  devServer: {
    host: '0.0.0.0'
  },
  runtimeConfig: {
    ueServer: process.env.NUXT_UE_SERVER || 'http://localhost:30010',
    public: {
      // Public runtime config goes here
    }
  }
})
