import fs from 'node:fs';
import path from 'node:path';

/**
 * Runs migrations in a simple single-file approach
 * For production, you would typically use a more robust migration tool (like Knex or Sequelize) that supports multiple migration files, rollbacks, etc.
 *
 * @param {import('node:sqlite').DatabaseSync} db
 */
export function runMigrations(db) {
  const sqlPath = path.resolve('src/db/migrations/001_init.sql');
  const sql = fs.readFileSync(sqlPath, 'utf-8');
  db.exec(sql);
}
