import type { Database as SQLiteDatabase } from 'better-sqlite3'

import SQlite from 'better-sqlite3'
import 'dotenv/config'
import { CamelCasePlugin, Kysely, SqliteDialect } from 'kysely'

import { type DB } from './types'

let sqlite: SQLiteDatabase | null = null
let kysely: Kysely<DB> | null

export const createDatabase = (
  url: string,
  { readonly = false } = {}
): Kysely<DB> => {
  sqlite ??= new SQlite(url, { readonly })
  const dialect = new SqliteDialect({ database: sqlite })
  kysely ??= new Kysely<DB>({
    dialect,
    plugins: [new CamelCasePlugin()],
  })
  return kysely
}
export const closeDatabase = async (): Promise<void> => {
  await kysely?.destroy()
  kysely = null
  sqlite = null
}

export type Database = Kysely<DB>
export type DatabasePartial<T> = Kysely<T>
export * from './types'
