import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp, getApps, cert } from 'firebase-admin/app'

const apps = getApps()

if (!apps.length) initializeApp({ credential: cert('./kalfort-firebase-adminsdk-m32w2-f316a7f6f8.json') })

export default async (req, res) => {
  const db = getFirestore()
  const playersSnap = await db.collection('users').get()
  return playersSnap.docs.map(doc => {
    return { uuid: doc.id, ...doc.data() }
  })
}
