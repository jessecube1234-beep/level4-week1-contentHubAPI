/**
 * Day 2: in-memory comments, nested under posts.
 *
 * @typedef {{ id: number, postId: number, body: string, authorId: number }} Comment
 */

/**
 * @typedef {Object} CommentsRepo
 * @property {(postId: number, opts?: {limit?: number, offset?: number}) => { items: Comment[], total: number }} listForPost
 * @property {(data: {postId: number, body: string, authorId: number}) => Comment} create
 */

export function createCommentsRepo() {
  /** @type {Comment[]} */
  const comments = [];
  let nextId = 1;

  return {
    listForPost(postId, { limit = 20, offset = 0 } = {}) {
      const all = comments.filter((c) => c.postId === postId);
      const total = all.length;
      const items = all.slice(offset, offset + limit);
      return { items, total };
    },

    getById(id) {
      return comments.find((c) => c.id === id) ?? null;
    },

    create({ postId, body }) {
      const comment = { id: nextId++, postId, body };
      comments.push(comment);
      return comment;
    },
  };
}
