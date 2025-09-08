import 'dotenv/config'

import { createApp } from '@/app'
import { createDatabase, closeDatabase } from '@/database'

const { DATABASE_URL, PORT } = process.env

if (!DATABASE_URL) {
  throw new Error('Provide DATABASE_URL in your environment variables.')
}
if (!PORT) {
  throw new Error('Provide PORT in your environment variables.')
}

const db = createDatabase(DATABASE_URL)
const app = createApp(db)

/* eslint-disable no-console */

const server = app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

process.on('SIGINT', async () => {
  console.log('Initiating database closing...')
  await closeDatabase()
  console.log('Database was closed.')

  server.close(() => console.log('Server stopped.'))
})
