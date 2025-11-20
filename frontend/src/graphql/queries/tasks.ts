import { gql } from "@apollo/client";

/**
 * GraphQL query to retrieve the list of all tasks.
 */
export const GET_TASK_LIST = gql`
  query GetTaskList {
    tasks {
      id
      title
      description
      status
      date
      assigned
    }
  }
`;
