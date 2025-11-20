/**
 * Represents the structure of a user object.
 * @property {number} id - Unique identifier for the user.
 * @property {string} name - The name of the user.
 * @property {string} email - The user's email address.
 * @property {string} level - The user's access or role level.
 * @property {string} [created_at] - ISO string when the user was created.
 * @property {string} [updated_at] - ISO string when the user was last updated.
 */
export interface User {
  id: number;
  name: string;
  email: string;
  level: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Request body for registering a new user.
 * @property {string} email - The email address of the new user.
 * @property {string} password - The password for the new account.
 * @property {string} passwordConfirmation - Password confirmation for validation.
 * @property {string} name - The display name of the new user.
 */
export interface RegisterData {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
}

/**
 * Request body for logging in.
 * @property {string} email - The email address associated with the account.
 * @property {string} password - The account password.
 */
export interface LoginData {
  email: string;
  password: string;
}

/**
 * Response type for user authentication/registration operations.
 * @property {User | null} user - The authenticated or created user (if successful).
 * @property {string} [token] - JWT or authentication token returned upon login.
 * @property {string[]} errors - An array of error messages (will be empty on success).
 */
export interface UserResponse {
  user: User | null;
  token?: string;
  errors: string[];
}

/**
 * Represent a selectable user option (e.g., for assignee dropdowns).
 * @property {number} id - The user's unique identifier.
 * @property {string} name - The user's display name.
 */
export type UserSelectItem = {
  id: number;
  name: string;
};
