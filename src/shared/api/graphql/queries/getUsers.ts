import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUserById($id: Int!) {
    findOneByParams(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      email
      name
      phone
      createdAt
    }
  }
`;