// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  css: ['~/assets/styles/main.scss'],
  modules: [
    '@pinia/nuxt',
    '@element-plus/nuxt',
    'vue3-pixi-nuxt'
  ],
})
