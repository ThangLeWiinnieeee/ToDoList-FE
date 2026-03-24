/**
 * Tag Types
 * 
 * @typedef {Object} Tag
 * @property {string} _id - Tag ID
 * @property {string} userId - User ID (foreign key)
 * @property {string} name - Tag name
 * @property {string} color - Tag color (hex code)
 * @property {Date} createdAt - Created timestamp
 * @property {Date} updatedAt - Updated timestamp
 * 
 * @typedef {Object} CreateTagPayload
 * @property {string} name - Tag name
 * @property {string} color - Tag color (hex code)
 * 
 * @typedef {Object} UpdateTagPayload
 * @property {string} name - Tag name (optional)
 * @property {string} color - Tag color (hex code, optional)
 */

export const TAG_TYPES = {
  TAG: 'tag',
  CREATE_PAYLOAD: 'createTagPayload',
  UPDATE_PAYLOAD: 'updateTagPayload',
};
