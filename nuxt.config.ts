import { defineNuxtConfig } from 'nuxt'
import svgLoader from 'vite-svg-loader'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  components: {
    global: true,
    dirs: ['~/components/atoms', '~/components/molecules', '~/components/organisms', '~/components/templates'],
  },
  css: ['~/assets/css/global.css'],
  buildModules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/pwa', 'floating-vue/nuxt'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~/tailwind.config.js',
    injectPosition: 0,
    viewer: false,
  },
  vite: {
    plugins: [svgLoader()],
  },
  publicRuntimeConfig: {
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.FIREBASE_MESSAGINS_SENDER_ID,
    firebaseAppId: process.env.FIREBASE_APP_ID,
  },
  experimental: {
    viteNode: true,
  },
})
