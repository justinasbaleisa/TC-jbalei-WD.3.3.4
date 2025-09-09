import { Router } from 'express'

import type { Services } from '@/types'

import { createMoviesController } from './controller'
import { createMoviesValidator } from './validate'

export const createMoviesRouter = (services: Services): Router => {
  const router = Router()
  const validate = createMoviesValidator()
  const controller = createMoviesController(services.movies)

  router
    .route('/')
    .post(validate.movieCreate, controller.post)
    .get(validate.movieIdsArray, validate.pagination, controller.get)

  router.param('id', validate.movieSingleId)

  router
    .route('/:id')
    .get(controller.get)
    .put(validate.movieCreate, controller.put)
    .patch(validate.movieUpdate, controller.patch)
    .delete(controller.delete)

  return router
}
