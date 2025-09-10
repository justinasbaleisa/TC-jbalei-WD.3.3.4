import { ColumnType, Generated, Selectable } from 'kysely'

export const DIRECTORS_TABLE = 'directors'
export interface DirectorsTable {
  movieId: number
  personId: number
}
export type DirectorsSelect = Selectable<DirectorsTable>

export const MOVIES_TABLE = 'movies'
export interface MoviesTable {
  id: Generated<number>
  title: string
  year: number | null
}
export type MoviesSelect = Selectable<MoviesTable>

export const PEOPLE_TABLE = 'people'
export interface PeopleTable {
  id: Generated<number>
  name: string
  birth: number | null
}
export type PeopleSelect = Selectable<PeopleTable>

export const RATINGS_TABLE = 'ratings'
export interface RatingsTable {
  movieId: number
  rating: number
  votes: number
}
export type RatingsSelect = Selectable<RatingsTable>

export const STARS_TABLE = 'stars'
export interface StarsTable {
  movieId: number
  personId: number
}
export type StarsSelect = Selectable<StarsTable>

export const SCREENINGS_TABLE = 'screenings'
export interface ScreeningsTable {
  id: Generated<number>
  createdAt: ColumnType<Date, string | undefined, never>
  allocatedTickets: number
  movieId: number
}
export type ScreeningsSelect = Selectable<ScreeningsTable>

export interface DB {
  directors: DirectorsTable
  movies: MoviesTable
  people: PeopleTable
  ratings: RatingsTable
  stars: StarsTable
  screenings: ScreeningsTable
  kysely_migration: {
    name: string
    timestamp: string
  }
}
