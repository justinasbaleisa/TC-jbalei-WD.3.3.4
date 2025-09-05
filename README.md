## Setup

**Note:** For this exercise, we have provided an `.env` file with the database connection string. Normally, you would not commit this file to version control. We are doing it here for simplicity and given that we are using a local SQLite database.

## Migrations

Before running the migrations, we need to create a database. We can do this by running the following command:

```bash
npm run migrate:latest
```

## Running the server

In development mode:

```bash
npm run dev
```

In production mode:

```bash
npm run start
```

## Updating types

If you make changes to the database schema, you will need to update the types. You can do this by running the following command:

```bash
npm run generate-types
```

## Requirements

## Issues (development plan)

### Phase 1: App Refactoring

**issue 1: Refactor `src/index.ts`**

Move the PORT variable into the .env file to align with best practices. Implement logic to explicitly open and close the database connection. Ensure the database instance is correctly passed to the createApp factory.

**issue 2: Introduce `src/types.ts`**

Define shared utility types and the global `Repositories` and `Services` interfaces.

**issue 3: Introduce Repositories layer**

Create `src/repositores.ts` with `createRepositories` factory to take database instance (dependency) and initialize `moviesRepository`, `screeningsRepository`, `ticketsRepository` objects.

**issue 4: Introduce Services layer**

Create `src/services.ts` with `createServices` factory to take repository instance (dependency) and initialize `moviesService`, `screeningsServuce`, `ticketsService` objects.

**issue 5: Refactor `src/app.ts`**

Reflect new architecture, where the application's routers are configured to use the services layer.

### Phase 2: Movies Refactoring

**issue 6: Implement Zod `schema.ts`**

Refactor `database/types.ts` for `Kysley` and export `MovieSelect`. Centralize in `schema.ts` all the `Movie` types incl. `Movie`, `MovieInsert`, `MovieUpdate`. Export with `parse*` functions and list of keys.

**issue 7: Implement `validation.ts`**

Create Validation layer for Id param, and Insert, Update inputs to be parsed.

**issue 8: Introduce `router.ts`**

Create module Router with Validation and Controller injections.

**issue 9: Introduce `services.ts`**

Split `src/modules/movies/controller.ts` into `Controller` and `Services`.

**issue 10: Refactor `repository.ts`**

Refactor `src/modules/movies/repository.ts` to become factory.

### Phase 2: Features TDD

..to be continue

