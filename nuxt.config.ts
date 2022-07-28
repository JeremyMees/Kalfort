import { defineNuxtConfig } from 'nuxt'
import svgLoader from 'vite-svg-loader'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/pwa', 'floating-vue/nuxt'],
  components: {
    global: true,
    dirs: ['~/components/atoms', '~/components/molecules', '~/components/organisms', '~/components/templates'],
  },
  css: ['~/assets/css/global.css'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~/tailwind.config.js',
    injectPosition: 0,
    viewer: false,
  },
  publicRuntimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
    baseUrl :  process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://localhost:3000'
  },
  vite: {
    plugins: [svgLoader()],
  },
  // experimental: {
  //   viteNode: true,
  // },
})
