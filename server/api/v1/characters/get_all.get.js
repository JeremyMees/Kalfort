import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp, getApps, cert } from 'firebase-admin/app'

const apps = getApps()

if (!apps.length) initializeApp({ credential: cert('./kalfort-firebase-adminsdk-m32w2-f316a7f6f8.json') })

export default defineEventHandler(async event => {
  const db = getFirestore()
  const charactersSnap = await db.collection('characters').get()
  return charactersSnap.docs.map(doc => {
    return { uuid: doc.id, ...doc.data() }
  })
})
