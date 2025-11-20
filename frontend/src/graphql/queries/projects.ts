import { gql } from "@apollo/client";

/**
 * This file contains all GraphQL queries and fragments related to projects,
 * including retrieving project lists, project details, and reusable task fragments.
 */
export const TASK_ITEM_FIELDS = gql`
  fragment TaskItemFields on TaskItem {
    id
    title
    description
    status
    date
    assigned
  }
`;

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
 * GraphQL query to retrieve detailed information about a project by its ID,
 * including its categorized tasks (todo, inProgress, done).
 */
export const GET_PROJECT = gql`
  ${TASK_ITEM_FIELDS}

  query GetProject($id: ID!) {
    project(id: $id) {
      id
      title
      description
      date
      tasks {
        todo {
          ...TaskItemFields
        }
        inProgress {
          ...TaskItemFields
        }
        done {
          ...TaskItemFields
        }
      }
    }
  }
`;

/**
 * This file defines GraphQL queries related to projects,
 * including queries for listing projects and retrieving
 * detailed information about a specific project, along 
 * with their categorized tasks.
 */
export const GET_PROJECTS_SELECT = gql`
  query GetProjects {
    projects {
      id
      title
    }
  }
`;
