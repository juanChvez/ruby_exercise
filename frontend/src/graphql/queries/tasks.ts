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

/**
 * GraphQL query to retrieve a single task by ID.
 */
export const GET_TASK = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      title
      description
      status
      date
      projectTitle
      assigned
    }
  }
`;

