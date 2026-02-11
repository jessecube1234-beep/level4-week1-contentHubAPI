import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Opens a SQLite database (file-backed or ':memory:') using node:sqlite.
 *
 * @param {string} dbPath
 * @returns {DatabaseSync}
 */
export function openDatabase(dbPath) {
  // Ensure parent folder exists for file-backed DBs
  if (dbPath !== ':memory:') {
    const dir = path.dirname(dbPath);
    fs.mkdirSync(dir, { recursive: true });
  }

  const db = new DatabaseSync(dbPath, { open: true });

  // Enforce foreign keys
  db.exec('PRAGMA foreign_keys = ON;');

  return db;
}
