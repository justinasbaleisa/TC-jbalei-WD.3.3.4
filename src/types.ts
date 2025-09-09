import type { NextFunction, Request, Response } from 'express'
import type { ParamsDictionary, Query } from 'express-serve-static-core'

import type {
  MoviesController,
  MoviesService,
  MoviesRepository,
} from './modules/movies/types'

export type ParamsWithId = ParamsDictionary & {
  id: string
  parsedId: number
}

type PaginationQuery = Query & {
  limit: string
  parsedLimit: number
  offset: string
  parsedOffset: number
}

export type RequestWithPagination<
  P extends ParamsDictionary = ParamsDictionary,
  Q extends Query = PaginationQuery,
> = Request<P, unknown, unknown, Q>

export type RequestWithIdsQuery = RequestWithPagination<
  ParamsDictionary,
  PaginationQuery & {
    id: string
    parsedIds: number[]
  }
>

interface BaseCrudMethods<Entity, Id, Create, Update> {
  create: (data: Create) => Promise<Entity | undefined>
  getAll: (limit?: number, offset?: number) => Promise<Entity[]>
  get: (ids?: Id[]) => Promise<Entity[]>
  update: (id: Id, data: Update) => Promise<Entity | undefined>
  delete: (id: Id) => Promise<Entity | undefined>
}

export interface BaseController<Entity, Create, Update> {
  post: (
    req: Request<ParamsWithId, unknown, Create>,
    res: Response<Entity>,
    next: NextFunction
  ) => void
  getAll: (
    req: RequestWithPagination,
    res: Response<Entity[]>,
    next: NextFunction
  ) => void
  get: (
    req: RequestWithIdsQuery,
    res: Response<Entity[]>,
    next: NextFunction
  ) => void
  patch: (
    req: Request<ParamsWithId, unknown, Update>,
    res: Response<Entity>,
    next: NextFunction
  ) => void
  put: (
    req: Request<ParamsWithId, unknown, Create>,
    res: Response<Entity>,
    next: NextFunction
  ) => void
  delete: (
    req: Request<ParamsWithId>,
    res: Response<Entity>,
    next: NextFunction
  ) => void
}

export interface BaseService<Entity, Id, Create, Update>
  extends BaseCrudMethods<Entity, Id, Create, Update> {}

export interface BaseRepository<Entity, Id, Insert, Update>
  extends BaseCrudMethods<Entity, Id, Insert, Update> {}

export interface Controllers {
  movies: MoviesController
  /* screenings: ScreeningsController
  tickets: TicketsController */
}

export interface Services {
  movies: MoviesService
  /* screenings: ScreeningsService
  tickets: TicketsService */
}

export interface Repositories {
  movies: MoviesRepository
  /* screenings: ScreeningsRepository
  tickets: TicketsRepository */
}

export type Expect<T extends true> = T
export type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false
