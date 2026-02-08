import { notFound } from '../utils/httpErrors.js';

/**
 * Runs after all routes, returning a 404 response.
 */
export function notFoundHandler(req, _res, next) {
  next(notFound(`Route not found: ${req.method} ${req.path}`));
}