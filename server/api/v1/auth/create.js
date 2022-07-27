import { getAuth } from 'firebase-admin/auth'
import { initializeApp, getApps, cert } from 'firebase-admin/app'

const apps = getApps()

if (!apps.length) initializeApp({ credential: cert('./kalfort-firebase-adminsdk-m32w2-f316a7f6f8.json') })

export default defineEventHandler(async event => {
  const body = await useBody(event)
  return getAuth()
    .createUser(body)
    .then(user => {
      return { ...user, error: false }
    })
    .catch(err => {
      return { error: true, message: err.errorInfo.message }
    })
})
