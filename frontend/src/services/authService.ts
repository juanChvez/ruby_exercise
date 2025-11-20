import client from "../apollo";
import { GET_PROFILE, VALIDATE_TOKEN } from "../graphql/queries/users";
import { gql } from '@apollo/client';
import type { User } from "../types/User";

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



export const authService = {
  REGISTER_MUTATION,
  LOGIN_MUTATION,

  /**
   * Fetch the current user's profile using the Apollo client.
   * Returns the user object on success, or throws on error.
   * 
   * @returns {Promise<User>} Resolved with user data.
   */
  getProfile: async (): Promise<User> => {
    try {
      const { data } = await client.query<{ user: User }>({
        query: GET_PROFILE,
        fetchPolicy: "network-only",
      });
      return data?.user!;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  },

  /**
   * Validates the authentication token using the Apollo client.
   * Returns true if token is valid, otherwise false.
   * 
   * @returns {Promise<boolean>} Resolved with token validity.
   */
  validateToken: async (): Promise<boolean> => {
    try {
      const { data } = await client.query<{ validate: { success: boolean; errors: string[] } }>({
        query: VALIDATE_TOKEN,
        fetchPolicy: "network-only",
      });
      return data?.validate.success!;
    } catch (error) {
      console.error("Error validating token:", error);
      return false;
    }
  },

};
