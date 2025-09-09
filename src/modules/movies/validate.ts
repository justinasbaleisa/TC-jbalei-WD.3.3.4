import type { NextFunction, Response, Request } from 'express'
import type {
  ParamsWithId,
  RequestWithIdsQuery,
  RequestWithPagination,
} from '@/types'

import type { MovieInsert, MovieUpdate } from './schema'

import { parseId, parseInsert, parseUpdate } from './schema'

const validateMovieSingleId = (
  req: Request,
  _res: Response,
  next: NextFunction,
  id: string
): void => {
  ;(req.params as ParamsWithId).parsedId = parseId(Number(id))
  next()
}

const validateMovieIdsArray = (
  req: RequestWithIdsQuery,
  _res: Response,
  next: NextFunction
): void => {
  const idsArray = req.query.id

  if (idsArray) {
    const ids = Array.isArray(idsArray)
      ? idsArray.flatMap((v) => String(v).split(','))
      : String(idsArray).split(',')

    const parsed = ids.map((id) => parseId(Number(id)))
    req.query.parsedIds = parsed
  }
  next()
}

const validateMovieCreate = (
  req: Request<ParamsWithId, unknown, MovieInsert>,
  _res: Response,
  next: NextFunction
): asserts req is Request<ParamsWithId, unknown, MovieInsert> => {
  req.body = parseInsert(req.body)
  next()
}

const validateMovieUpdate = (
  req: Request<ParamsWithId, unknown, MovieUpdate>,
  _res: Response,
  next: NextFunction
): asserts req is Request<ParamsWithId, unknown, MovieUpdate> => {
  req.body = parseUpdate(req.body)
  next()
}

const validatePagination = (
  req: RequestWithPagination,
  _res: Response,
  next: NextFunction
): void => {
  const { limit, offset } = req.query
  const parsedLimit = Number(limit)
  const parsedOffset = Number(offset)
  req.query.parsedLimit = Number.isNaN(parsedLimit) || parsedLimit < 0 ? 0 : parsedLimit
  req.query.parsedOffset = Number.isNaN(parsedOffset) || parsedOffset < 0 ? 0 : parsedOffset

  next()
}

export const createMoviesValidator = () => ({
  movieSingleId: validateMovieSingleId,
  movieIdsArray: validateMovieIdsArray,
  movieCreate: validateMovieCreate,
  movieUpdate: validateMovieUpdate,
  pagination: validatePagination,
})
