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
