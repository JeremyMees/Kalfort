import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp, getApps, cert } from 'firebase-admin/app'

const apps = getApps()

if (!apps.length) initializeApp({ credential: cert('./kalfort-firebase-adminsdk-m32w2-f316a7f6f8.json') })

export default defineEventHandler(async event => {
  const db = getFirestore()
  const achievements = await db.collection('achievements').get()
  return achievements.docs.map(doc => {
    return { uuid: doc.id, ...doc.data() }
  })
})
