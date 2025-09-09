import type { Repositories, Services } from '@/types'
import { createMoviesService } from './modules/movies/service'
import { createScreeningsService } from './modules/screenings/service'
import { createTicketsService } from './modules/tickets/service'

export const createServices = (repositories: Repositories): Services => ({
  movies: createMoviesService(repositories.movies),
  /* screenings: createScreeningsService(repositories.screenings),
  tickets: createTicketsService(repositories.tickets), */
})
