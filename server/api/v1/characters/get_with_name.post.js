import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp, getApps, cert } from 'firebase-admin/app'

const apps = getApps()

if (!apps.length) initializeApp({ credential: cert('./kalfort-firebase-adminsdk-m32w2-f316a7f6f8.json') })

export default defineEventHandler(async event => {
  const db = getFirestore()
  const body = await useBody(event)
  const characterSnap = await db.collection('characters').where('character_name', '==', body.name).get()
  return { uuid: characterSnap.docs[0].id, ...characterSnap.docs[0].data() }
})
