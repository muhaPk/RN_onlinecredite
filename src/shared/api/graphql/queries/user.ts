import { gql } from '@apollo/client';

export const CHECK_IS_VERIFIED = gql`
query ChekIsVerified($id: Int) {
  user(id: $id) {
    id
    isVerified
  }
}
`;

export const GET_USER = gql`
query GetUser($id: Int) {
  user(id: $id) {
    id
    name
    surname
    email
    phone
    idPassport
  }
}
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      email
    }
  }
`;

