import express from 'express'

import type { Database } from '@/database'

import jsonErrorHandler from '@/middleware/jsonErrors'
import movies from '@/modules/movies/controller'

export const createApp = (db: Database) => {
  const app = express()

  app.use(express.json())

  // register your controllers here
  app.use('/movies', movies(db))

  app.use(jsonErrorHandler)

  return app
}
