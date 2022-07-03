import Vue3Lottie from 'vue3-lottie'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(Vue3Lottie)
})
