/**
 * Day 2: Extend the in-memory repo with getById and paginated list.
 *
 * This repository is responsible ONLY for data access.
 * It does not know about Express, requests, or responses.
 *
 * @typedef {{ id: number, title: string, body: string, authorId: number }} Post
 */

/**
 * @typedef {Object} PostsRepo
 * @property {(opts?: {limit?: number, offset?: number}) => { items: Post[], total: number }} list
 * @property {(id: number) => Post|null} getById
 * @property {(data: {title: string, body: string, authorId: number}) => Post} create
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

      // TODO: update this to the proper function once we have databases
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
    create({ title, body, authorId }) {
      const post = { id: nextId++, title, body, authorId };
      posts.push(post);
      return post;
    },

    update({ id, title, body, authorId }) {
      const post = posts.find((p) => p.id === id) ?? null;
      if (!post) return null;
      if (post.authorId !== authorId) return 'forbidden';

      post.title = title;
      post.body = body;
      return post;
    },

    delete({ id, authorId }) {
      const idx = posts.findIndex((p) => p.id === id);
      if (idx === -1) return null;
      if (posts[idx].authorId !== authorId) return 'forbidden';

      posts.splice(idx, 1);
      return true;
    },
  };
}
