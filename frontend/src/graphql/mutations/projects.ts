import { gql } from "@apollo/client";

/**
 * GraphQL mutation to create a new project.
 */
export const CREATE_PROJECT = gql`
  mutation CreateProject($name: String!, $description: String) {
    createProject(name: $name, description: $description) {
      project {
        id
        title
        description
        tasks
        date
      }
      errors
    }
  }
`;
