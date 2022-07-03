import { defineNuxtPlugin } from '#app'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  const firebaseConfig = {
    apiKey: config.firebaseApiKey,
    authDomain: config.firebaseAuthDomain,
    projectId: config.firebaseProjectId,
    storageBucket: config.firebaseStorageBucket,
    messagingSenderId: config.firebaseMessagingSenderId,
    appId: config.firebaseAppId,
  }
  const app = initializeApp(firebaseConfig)

  nuxtApp.provide('$firebase', app)
  nuxtApp.provide('$firebaseDB', getFirestore(app))
  nuxtApp.provide('$firebaseAuth', getAuth(app))
  nuxtApp.provide('$firebaseStorage', getStorage(app))
})
