/**
 * Day 2: Extend the in-memory repo with getById and paginated list.
 *
 * This repository is responsible ONLY for data access.
 * It does not know about Express, requests, or responses.
 *
 * @typedef {{ id: number, title: string, body: string }} Post
 */

/**
 * @typedef {Object} PostsRepo
 * @property {(opts?: {limit?: number, offset?: number}) => { items: Post[], total: number }} list
 * @property {(id: number) => Post|null} getById
 * @property {(data: {title: string, body: string}) => Post} create
 */

export function createPostsRepo() {
  /** @type {Post[]} */
  const posts = [];
  let nextId = 1;

  return {
    /**
     * List posts with pagination.
     * Day 2: still in-memory, later replaced with DB logic.
     */
    list({ limit = 20, offset = 0 } = {}) {
      const total = posts.length;
      const items = posts.slice(offset, offset + limit);
      return { items, total };
    },

    /**
     * Get a single post by id.
     * Returns null if the post does not exist.
     */
    getById(id) {
      return posts.find((post) => post.id === id) || null;
    },

    /**
     * Create a new post.
     */
    create({ title, body }) {
      const post = { id: nextId++, title, body };
      posts.push(post);
      return post;
    },
  };
}

