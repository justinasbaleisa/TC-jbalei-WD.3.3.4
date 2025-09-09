import type { Database } from '@/database'
import type { Movie, MovieInsert, MovieUpdate } from './schema'
import type { MoviesRepository } from './types'

import { MOVIES_TABLE } from '@/database'

const repositoryCreateMovie =
  (db: Database) =>
  async (data: MovieInsert): Promise<Movie | undefined> =>
    db.insertInto(MOVIES_TABLE).values(data).returningAll().executeTakeFirst()

const repositoryGetAllMovies =
  (db: Database) =>
  async (limit = 10, offset = 0): Promise<Movie[]> => {
    let query = db.selectFrom(MOVIES_TABLE).selectAll()
    if (limit > 0) query = query.limit(limit)
    if (offset > 0) query = query.offset(offset)
    return query.execute()
  }

const repositoryGetMoviesByIds =
  (db: Database) =>
  async (ids: Movie['id'][]): Promise<Movie[]> =>
    db.selectFrom(MOVIES_TABLE).selectAll().where('id', 'in', ids).execute()

const repositoryUpdateMovieById =
  (db: Database) =>
  async (id: Movie['id'], data: MovieUpdate): Promise<Movie | undefined> =>
    db
      .updateTable(MOVIES_TABLE)
      .set(data)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst()

const repositoryDeleteMovieById =
  (db: Database) =>
  async (id: Movie['id']): Promise<Movie | undefined> =>
    db
      .deleteFrom('movies')
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst()

export const createMoviesRepository = (db: Database): MoviesRepository => ({
  create: repositoryCreateMovie(db),
  getAll: repositoryGetAllMovies(db),
  get: repositoryGetMoviesByIds(db),
  update: repositoryUpdateMovieById(db),
  delete: repositoryDeleteMovieById(db),
})
