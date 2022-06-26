import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp, getApps, cert } from 'firebase-admin/app'

const apps = getApps()

if (!apps.length) initializeApp({ credential: cert('./kalfort-firebase-adminsdk-m32w2-f316a7f6f8.json') })

export default defineEventHandler(async event => {
  const db = getFirestore()
  const query = useQuery(event)
  if (Object.keys(query).length === 0) {
    const playersSnap = await db.collection('users').get()
    return playersSnap.docs.map(doc => {
      return { uuid: doc.id, ...doc.data() }
    })
  } else {
    const playerSnap = await db.collection('users').where('character_name', '==', query.name).get()
    return { uuid: playerSnap.docs[0].id, ...playerSnap.docs[0].data() }
  }
})
