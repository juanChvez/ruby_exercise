import { gql } from "@apollo/client";

/**
 * GraphQL user-related service operations and queries.
 * Includes queries for listing users for assignment or management.
 */
export const GET_USERS_SELECT = gql`
  query GetUsersSelect {
    users {
      id
      name
    }
  }
`;

// GraphQL query for getting current user's profile with camelCase fields
export const GET_PROFILE = gql`
query GetProfileCamelCase {
  user {
    id
    name
    email
    createdAt
    updatedAt
    level
  }
}
`;
