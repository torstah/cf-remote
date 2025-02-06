// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui'
  ],
  ui: {
    global: true
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
  }
})
