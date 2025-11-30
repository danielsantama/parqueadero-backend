# This file provides information about database migrations.

## Migrations Overview

This directory contains migration files that are responsible for managing changes to the database schema over time. Migrations allow for version control of the database structure, enabling the application to evolve without losing data integrity.

## Migration Files

Each migration file should be named in a way that reflects its purpose and the date it was created. For example, a migration file for creating the `usuarios` table might be named `YYYYMMDDHHMMSS_create_usuarios_table.ts`.

## Running Migrations

To apply migrations, use the following command:

```
npm run migrate
```

This command will execute all pending migrations in the order they were created.

## Rollback Migrations

If you need to revert a migration, you can use the following command:

```
npm run rollback
```

This will undo the last applied migration.

## Best Practices

- Always create a backup of your database before running migrations.
- Test migrations in a development environment before applying them to production.
- Keep migration files organized and well-documented for future reference.