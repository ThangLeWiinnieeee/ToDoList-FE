/**
 * Authentication Types
 * 
 * @typedef {Object} User
 * @property {string} _id - User ID
 * @property {string} email - User email
 * @property {string} name - User name
 * @property {Date} createdAt - Created timestamp
 * @property {Date} updatedAt - Updated timestamp
 * 
 * @typedef {Object} AuthResponse
 * @property {string} token - JWT token
 * @property {User} user - User object
 * @property {string} message - Response message
 * 
 * @typedef {Object} LoginPayload
 * @property {string} email - User email
 * @property {string} password - User password
 * 
 * @typedef {Object} RegisterPayload
 * @property {string} email - User email
 * @property {string} password - User password
 * @property {string} confirmPassword - Confirm password
 * @property {string} name - User name
 */

export const AUTH_TYPES = {
  USER: 'user',
  AUTH_RESPONSE: 'authResponse',
  LOGIN_PAYLOAD: 'loginPayload',
  REGISTER_PAYLOAD: 'registerPayload',
};
