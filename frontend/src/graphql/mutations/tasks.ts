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
