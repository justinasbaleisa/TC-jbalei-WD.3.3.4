import type { Request, Response } from 'express'
import type { MoviesController, MoviesService } from './types'
import type { Movie, MovieInsert, MovieUpdate } from './schema'
import { ApiError } from '@/middleware/json-errors-handler'
import {
  ParamsWithId,
  RequestWithIdsQuery,
  RequestWithPagination,
} from '@/types'

const handlePostMovie =
  (serviceMovies: MoviesService) =>
  async (
    req: Request<ParamsWithId, unknown, MovieInsert>,
    res: Response<Movie>
  ): Promise<void> => {
    const movie = await serviceMovies.create(req.body)
    if (!movie) throw new ApiError(400)
    res.status(201).json(movie)
  }

const handleGetAllMovies =
  (serviceMovies: MoviesService) =>
  async (req: RequestWithPagination, res: Response<Movie[]>): Promise<void> => {
    const movies = await serviceMovies.getAll(
      req.query.parsedLimit,
      req.query.parsedOffset
    )
    if (!movies || movies.length === 0) throw new ApiError(404)
    res.status(200).json(movies)
  }

const handleGetMovieByIds =
  (serviceMovies: MoviesService) =>
  async (req: RequestWithIdsQuery, res: Response<Movie[]>): Promise<void> => {
    const movies = await serviceMovies.get(req.query.parsedIds)
    if (!movies || movies.length === 0) throw new ApiError(404)
    res.status(200).json(movies)
  }

const handlePatchMovie =
  (serviceMovies: MoviesService) =>
  async (
    req: Request<ParamsWithId, unknown, MovieUpdate>,
    res: Response<Movie>
  ): Promise<void> => {
    const movie = await serviceMovies.update(req.params.parsedId, req.body)
    if (!movie) throw new ApiError(404)
    res.status(200).json(movie)
  }

const handleUpdateMovie =
  (serviceMovies: MoviesService) =>
  async (
    req: Request<ParamsWithId, unknown, MovieInsert>,
    res: Response<Movie>
  ): Promise<void> => {
    const movie = await serviceMovies.update(req.params.parsedId, req.body)
    if (!movie) throw new ApiError(404)
    res.status(200).json(movie)
  }

const handleDeleteMovie =
  (serviceMovies: MoviesService) =>
  async (req: Request<ParamsWithId>, res: Response<Movie>): Promise<void> => {
    const movie = await serviceMovies.delete(req.params.parsedId)
    if (!movie) throw new ApiError(404)
    res.status(200).json(movie)
  }

export const createMoviesController = (
  serviceMovies: MoviesService
): MoviesController => ({
  post: handlePostMovie(serviceMovies),
  getAll: handleGetAllMovies(serviceMovies),
  get: handleGetMovieByIds(serviceMovies),
  patch: handlePatchMovie(serviceMovies),
  put: handleUpdateMovie(serviceMovies),
  delete: handleDeleteMovie(serviceMovies),
})
