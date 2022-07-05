import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp, getApps, cert } from 'firebase-admin/app'

const apps = getApps()

if (!apps.length) initializeApp({ credential: cert('./kalfort-firebase-adminsdk-m32w2-f316a7f6f8.json') })

export default defineEventHandler(async event => {
  const auth = getAuth()
  const db = getFirestore()
  const body = await useBody(event)
  const user = await auth.getUser(body.uid)
  const charactersSnap = await db.collection('characters').where('created_by', '==', body.uid).get()
  return {
    player: { email: user.email, name: user.displayName, image: user.photoURL, uid: user.uid },
    characters: charactersSnap.docs.map(doc => {
      return { uuid: doc.id, ...doc.data() }
    }),
  }
})
