import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAlOIXYjLs-98xrUwUiXpAQ1SDmGBm0UKM',
  authDomain: 'kalfort.firebaseapp.com',
  projectId: 'kalfort',
  storageBucket: 'kalfort.appspot.com',
  messagingSenderId: '653335418383',
  appId: '1:653335418383:web:3ffa212eb16a1f02f5357a',
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export const saveImage = async (fullPath, file, contentType) => {
  return uploadString(ref(storage, fullPath), file, 'data_url', { contentType }).then(snapshot =>
    getImage(snapshot.metadata.fullPath)
  )
}

export const getImage = async fullPath => await getDownloadURL(ref(storage, fullPath))
