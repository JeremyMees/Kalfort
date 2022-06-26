import { defineNuxtConfig } from 'nuxt'
import svgLoader from 'vite-svg-loader'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  components: {
    global: true,
    dirs: ['~/components/atoms', '~/components/molecules', '~/components/organisms', '~/components/templates'],
  },
  css: ['~/assets/css/global.css'],
  buildModules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/pwa'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~/tailwind.config.js',
    injectPosition: 0,
    viewer: false,
  },
  vite: {
    plugins: [svgLoader()],
  },
})
