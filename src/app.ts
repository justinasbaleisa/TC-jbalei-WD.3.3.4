import express from 'express'

import type { Database } from '@/database'
import type { Repositories, Services } from '@/types'

import { createRepositories } from '@/repositories'
import { createServices } from '@/services'
import { jsonErrorHandler } from '@/middleware/json-errors-handler'

import { createMoviesRouter } from '@/modules/movies/router'

export const createApp = (db: Database) => {
  const app = express()

  app.use(express.json())

  const repositories: Repositories = createRepositories(db)
  const services: Services = createServices(repositories)

  // register your controllers here
  app.use('/movies', createMoviesRouter(services))

  app.use(jsonErrorHandler)

  return app
}
