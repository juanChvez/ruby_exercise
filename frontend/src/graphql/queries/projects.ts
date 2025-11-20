import { gql } from "@apollo/client";

/**
 * GraphQL query to get the list of projects.
 */
export const PROJECT_LIST = gql`
  query ProjectList {
    projects {
      id
      title
      description
      tasks
      date
    }
  }
`;

/**
 * GraphQL query to retrieve the details of a single project by ID.
 */
export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      name
    }
  }
`;

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

