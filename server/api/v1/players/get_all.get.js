import { getAuth } from 'firebase-admin/auth'
import { initializeApp, getApps, cert } from 'firebase-admin/app'

const apps = getApps()

if (!apps.length) initializeApp({ credential: cert('./kalfort-firebase-adminsdk-m32w2-f316a7f6f8.json') })

export default defineEventHandler(async event => {
  const auth = getAuth()
  const data = await auth.listUsers(1000)
  return data.users.map(user => {
    return { email: user.email, name: user.displayName, image: user.photoURL, uid: user.uid }
  })
})
