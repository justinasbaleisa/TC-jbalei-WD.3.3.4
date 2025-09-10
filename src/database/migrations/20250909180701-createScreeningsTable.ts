import { Kysely, SqliteDatabase, sql } from 'kysely'

import { SCREENINGS_TABLE } from '../types'

export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable(SCREENINGS_TABLE)
    .ifNotExists()
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn('created_at', 'timestamp', (c) => c.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('allocated_tickets', 'integer', (c) => c.notNull())
    .addColumn('movie_id', 'integer', (c) =>
      c.notNull().references('movies.id').onDelete('cascade')
    )
    .execute()
}

export async function down(db: Kysely<SqliteDatabase>) {
  await db.schema.dropTable(SCREENINGS_TABLE).execute()
}
