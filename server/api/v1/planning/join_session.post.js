import { google } from 'googleapis'

const spreadsheetId = process.env.GOOGEL_SHEET_ID

export default defineEventHandler(async event => {
  const body = await useBody(event)
  const auth = new google.auth.GoogleAuth({
    keyFile: 'kalfort-6b24ba5caaab.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  })
  const client = await auth.getClient()
  const sheets = google.sheets({ version: 'v4', auth: client })
  const planning = await sheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    valueInputOption: 'RAW',
    resource: { values: [[body.value]] },
    range: `Planning sessies!${body.cel}`,
  })
  return planning.data?.updates.updatedCells === 1 ? true : false
})
