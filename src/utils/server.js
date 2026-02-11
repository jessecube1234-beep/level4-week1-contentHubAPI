import { ensureEnv } from '#utils/env';
import { createApp } from '#app';
import { createRepos } from '#repositories/index';
import { openDatabase } from '../db/migrations/database.js';
import { runMigrations } from '../db/migrations/migrate.js';

const env = ensureEnv();

// Open SQLite database
const db = openDatabase(env.DB_HOST);

// Run migrations
runMigrations(db);

const repos = await createRepos(db);

// The main app
const app = createApp({
  repos,
  config: {
    JWT_SECRET: env.JWT_SECRET,
  },
});

// Start the server
app.listen(env.PORT, () => {
  console.log(`ContentHub API listening on http://localhost:${env.PORT}`);
});
