import { gql } from "@apollo/client";

/**
 * GraphQL query to retrieve dashboard summary data.
 */
export const DASHBOARD_QUERY = gql`
  query Dashboard {
    dashboard
  }
`;