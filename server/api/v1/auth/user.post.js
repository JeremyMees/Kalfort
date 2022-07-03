import { getAuth } from 'firebase-admin/auth'
import { initializeApp, getApps, cert } from 'firebase-admin/app'

const apps = getApps()

if (!apps.length) initializeApp({ credential: cert('./kalfort-firebase-adminsdk-m32w2-f316a7f6f8.json') })

export default defineEventHandler(async event => {
  const auth = getAuth()
  const body = await useBody(event)
  return auth
    .createUser(body)
    .then(user => {
      return { error: false, user }
    })
    .catch(error => {
      return { error: true, message: error.errorInfo.message }
    })
})
