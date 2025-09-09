import type { MoviesRepository, MoviesService } from './types'
import type { Movie, MovieInsert, MovieUpdate } from './schema'

const serviceCreateMovie =
  (moviesRepository: MoviesRepository) =>
  async (data: MovieInsert): Promise<Movie | undefined> =>
    moviesRepository.create(data)

const serviceGetAllMovies =
  (moviesRepository: MoviesRepository) =>
  async (limit = 0, offset = 0): Promise<Movie[]> => {
    const movies = await moviesRepository.getAll(limit, offset)
    return movies.sort((a, b) => a.id - b.id)
  }

const serviceGetMoviesByIds =
  (moviesRepository: MoviesRepository) =>
  async (ids?: Movie['id'][]): Promise<Movie[]> =>
    ids && ids.length ? moviesRepository.get(ids) : moviesRepository.getAll()

const serviceUpdateMovieById =
  (moviesRepository: MoviesRepository) =>
  async (id: Movie['id'], data: MovieUpdate): Promise<Movie | undefined> =>
    moviesRepository.update(id, data)

const serviceDeleteMovieById =
  (moviesRepository: MoviesRepository) =>
  async (id: Movie['id']): Promise<Movie | undefined> =>
    moviesRepository.delete(id)

export const createMoviesService = (
  moviesRepository: MoviesRepository
): MoviesService => ({
  create: serviceCreateMovie(moviesRepository),
  getAll: serviceGetAllMovies(moviesRepository),
  get: serviceGetMoviesByIds(moviesRepository),
  update: serviceUpdateMovieById(moviesRepository),
  delete: serviceDeleteMovieById(moviesRepository),
})
