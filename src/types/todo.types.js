/**
 * Todo Types
 * 
 * @typedef {Object} Todo
 * @property {string} _id - Todo ID
 * @property {string} userId - User ID (foreign key)
 * @property {string} title - Todo title
 * @property {string} description - Todo description
 * @property {boolean} isDone - Whether todo is completed
 * @property {Date} dueDate - Due date
 * @property {string[]} tags - Array of Tag IDs
 * @property {Date|null} deletedAt - Soft delete timestamp (null if not deleted)
 * @property {Date} createdAt - Created timestamp
 * @property {Date} updatedAt - Updated timestamp
 * 
 * @typedef {Object} CreateTodoPayload
 * @property {string} title - Todo title
 * @property {string} description - Todo description
 * @property {Date} dueDate - Due date
 * @property {string[]} tags - Array of Tag IDs
 * 
 * @typedef {Object} UpdateTodoPayload
 * @property {string} title - Todo title (optional)
 * @property {string} description - Todo description (optional)
 * @property {boolean} isDone - Whether todo is completed (optional)
 * @property {Date} dueDate - Due date (optional)
 * @property {string[]} tags - Array of Tag IDs (optional)
 * 
 * @typedef {Object} TodoFilter
 * @property {string} status - Filter status: 'all', 'completed', 'pending'
 * @property {string} tagId - Filter by tag ID (optional)
 */

export const TODO_TYPES = {
  TODO: 'todo',
  CREATE_PAYLOAD: 'createTodoPayload',
  UPDATE_PAYLOAD: 'updateTodoPayload',
  FILTER: 'todoFilter',
};
