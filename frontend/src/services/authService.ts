import { gql } from '@apollo/client';

/**
 * Represents the structure of a user object.
 */
export interface User {
  id: number;
  name: string;
  email: string;
  level: string;
}

/**
 * Request body for registering a new user.
 */
export interface RegisterData {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
}

/**
 * Request body for logging in.
 */
export interface LoginData {
  email: string;
  password: string;
}

export interface UserResponse {
  user: User | null;
  token?: string;
  errors: string[];
}

const REGISTER_MUTATION = gql`
mutation Register($email: String!, $password: String!, $name: String!, $passwordConfirmation: String!) {
  createUser(
    email: $email
    name: $name
    password: $password
    passwordConfirmation: $passwordConfirmation
  ) {
    user {
      id
      email
      name
      level
    }
    errors
  }
}
`;

const LOGIN_MUTATION = gql`
mutation Login($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    token
    user {
      id
      name
      email
      level
    }
  }
}
`;

const GET_PROFILE_QUERY = gql`
query GetProfile {
  user {
    id
    name
    email
    role
    created_at
    updated_at
  }
}
`;

export const authService = {
  REGISTER_MUTATION,
  LOGIN_MUTATION,
  GET_PROFILE_QUERY,
};
