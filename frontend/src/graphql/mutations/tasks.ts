import { gql } from "@apollo/client";

/**
 * GraphQL mutation to create a new task.
 */
export const CREATE_TASK = gql`
  mutation CreateTask(
    $title: String!
    $description: String
    $assigneeId: ID
    $assigneeType: String
    $projectId: ID!
  ) {
    createTask(
      title: $title
      description: $description
      assigneeId: $assigneeId
      assigneeType: $assigneeType
      projectId: $projectId
    ) {
      task {
        id
        title
        description
        status
        date
        assigned
      }
      errors
    }
  }
`;

/**
 * GraphQL mutation to update an existing task.
 * Returns updated task fields and potential errors.
 */
export const UPDATE_TASK = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      task {
        title
        description
        status
        assigned
      }
      errors
    }
  }
`;
