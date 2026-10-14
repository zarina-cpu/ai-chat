/** @typedef {'user' | 'agent'} MessageRole */

/**
 * @typedef {Object} ChatMessage
 * @property {string} id
 * @property {MessageRole} role
 * @property {string} text
 * @property {number} createdAt
 */

export const ROLE_USER = 'user';
export const ROLE_AGENT = 'agent';
