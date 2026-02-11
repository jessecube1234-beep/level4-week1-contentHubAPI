/**
 * Loads and validates environment variables for the application.
 * This is intentionally small and explicit for teaching purposes.
 */
import dotenv from 'dotenv';

dotenv.config();

/**
 * @returns {{ PORT: number }}
 */
export function ensureEnv() {
  const PORT = Number(process.env.PORT ?? 3000);

  //Load the JWT variable
  const JWT_SECRET = process.env.JWT_SECRET ?? '';

  // Load DB PATH
  const DB_HOST = process.env.DB_HOST ?? '';

  if (!Number.isFinite(PORT) || PORT <= 0) {
    throw new Error('Invalid PORT. Please set PORT to a valid number.');
  }

  // Validation of the length of the key
  if (JWT_SECRET.length < 31) {
    throw new Error('Invalid JWT_SECRET. Please set a long random string (32+ chars)');
  }

  // Validation for DB_HOST
  if (!DB_HOST.trim()) {
    throw new Error('Invalid DB_HOST. Please set a valid path for the database.');
  }

  return { PORT, JWT_SECRET, DB_HOST };
}
