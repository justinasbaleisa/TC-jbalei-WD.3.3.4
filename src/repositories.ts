import type { Database } from '@/database'
import { Repositories } from '@/types'
import { createMoviesRepository } from '@/modules/movies/repository'
import { createScreeningsRepository } from '@/modules/screenings/repository'
import { createTicketsRepository } from '@/modules/tickets/repository'

export const createRepositories = (db: Database): Repositories => ({
  movies: createMoviesRepository(db),
  /* screenings: createScreeningsRepository(db),
  tickets: createTicketsRepository(db), */
})
