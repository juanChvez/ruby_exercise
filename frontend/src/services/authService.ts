import { gql } from '@apollo/client';

const REGISTER_MUTATION = gql`
mutation Register($email: String!, $password: String!, $name: String!, $passwordConfirmation: String!) {
  createUser(
    email: $email
    name: $name
    password: $password
    passwordConfirmation: $passwordConfirmation
  ) {
    user {
      id
      email
      name
      level
    }
    errors
  }
}
`;

const LOGIN_MUTATION = gql`
mutation Login($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    token
    user {
      id
      name
      email
      level
    }
  }
}
`;

const GET_PROFILE_QUERY = gql`
query GetProfile {
  user {
    id
    name
    email
    level
    created_at
    updated_at
  }
}
`;

export const authService = {
  REGISTER_MUTATION,
  LOGIN_MUTATION,
  GET_PROFILE_QUERY,
};
