import { BaseController, BaseService, BaseRepository } from '@/types'
import type { Movie, MovieInsert, MovieUpdate } from './schema'

export type MoviesController = BaseController<Movie, MovieInsert, MovieUpdate>
export type MoviesService = BaseService<
  Movie,
  Movie['id'],
  MovieInsert,
  MovieUpdate
>
export type MoviesRepository = BaseRepository<
  Movie,
  Movie['id'],
  MovieInsert,
  MovieUpdate
>
