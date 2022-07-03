import { getStorage } from 'firebase-admin/storage'
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import formidable from 'formidable'

const apps = getApps()

if (!apps.length)
  initializeApp({
    credential: cert('./kalfort-firebase-adminsdk-m32w2-f316a7f6f8.json'),
    storageBucket: 'kalfort.appspot.com',
  })

export default defineEventHandler(async event => {
  const bucket = getStorage().bucket('kalfort')
  const body = await useBody(event)
  const form = formidable({})
  form.parse(event, (err, fields, files) => {
    if (err) {
      console.log(err, 'error')
      next(err)
      return
    }
    console.log({ fields, files }, 'no error')
    res.json({ fields, files })
  })
  console.log(body)
  // const formData = {}
  // body.forEach((value, key) => (body[key] = value))
  // const asset = await storage.upload(body.file, {
  //   destination: body.fullPath,
  //   contentType: body.contentType,
  // })
  // console.log(formData)
})
