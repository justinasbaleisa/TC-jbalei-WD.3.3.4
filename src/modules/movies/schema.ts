import { z } from 'zod'

import type { MoviesSelect } from '@/database/types'
import type { Equal, Expect } from '@/types'

const schemaId: z.ZodNumber = z.number().int().positive()
const schemaSelect = z
  .object({
    id: schemaId,
    title: z.string(),
    year: z.number().nullable(),
  })
  .strict() satisfies z.ZodType<MoviesSelect>
const schemaInsert = schemaSelect.omit({ id: true })
const schemaUpdate = schemaInsert.partial()

export type Movie = z.infer<typeof schemaSelect>
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
type _checkMovie = Expect<Equal<Movie, MoviesSelect>>

export type MovieInsert = z.infer<typeof schemaInsert>
export type MovieUpdate = z.infer<typeof schemaUpdate>

export const parseId = (id: unknown): Movie['id'] => schemaId.parse(id)
export const parseInsert = (record: unknown): MovieInsert =>
  schemaInsert.parse(record)
export const parseSelect = (record: unknown): Movie =>
  schemaSelect.parse(record)
export const parseUpdate = (record: unknown): MovieUpdate =>
  schemaUpdate.parse(record)

export const keys: (keyof Movie)[] = Object.keys(
  schemaSelect.shape
) as (keyof z.infer<typeof schemaSelect>)[]
