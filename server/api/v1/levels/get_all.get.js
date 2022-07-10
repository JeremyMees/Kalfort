import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp, getApps, cert } from 'firebase-admin/app'

const apps = getApps()

if (!apps.length) initializeApp({ credential: cert('./kalfort-firebase-adminsdk-m32w2-f316a7f6f8.json') })

export default defineEventHandler(async event => {
  const db = getFirestore()
  const levels = await db.collection('levels').orderBy('level').get()
  return levels.docs.map(doc => {
    return { uuid: doc.id, ...doc.data() }
  })
})
