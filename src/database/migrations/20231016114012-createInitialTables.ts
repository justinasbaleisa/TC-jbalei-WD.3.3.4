import { Kysely, SqliteDatabase } from 'kysely'

import {
  MOVIES_TABLE,
  PEOPLE_TABLE,
  STARS_TABLE,
  DIRECTORS_TABLE,
  RATINGS_TABLE,
} from '../types'

/** Migration used to initialize empty database tables for the test database. */
export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable(MOVIES_TABLE)
    .ifNotExists()
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn('title', 'text', (c) => c.notNull())
    .addColumn('year', 'numeric')
    .execute()

  await db.schema
    .createTable(PEOPLE_TABLE)
    .ifNotExists()
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn('name', 'text', (c) => c.notNull())
    .addColumn('birth', 'numeric')
    .execute()

  await db.schema
    .createTable(STARS_TABLE)
    .ifNotExists()
    .addColumn('movie_id', 'integer', (c) =>
      c.notNull().references('movies.id')
    )
    .addColumn('person_id', 'integer', (c) =>
      c.notNull().references('people.id')
    )
    .execute()

  await db.schema
    .createTable(DIRECTORS_TABLE)
    .ifNotExists()
    .addColumn('movie_id', 'integer', (c) =>
      c.notNull().references('movies.id')
    )
    .addColumn('person_id', 'integer', (c) =>
      c.notNull().references('people.id')
    )
    .execute()

  await db.schema
    .createTable(RATINGS_TABLE)
    .ifNotExists()
    .addColumn('movie_id', 'integer', (c) =>
      c.notNull().references('movies.id')
    )
    .addColumn('rating', 'real', (c) => c.notNull())
    .addColumn('votes', 'integer', (c) => c.notNull())
    .execute()
}

export async function down() {
  // unnecessary, as this is the first migration, we can just delete the database
}
