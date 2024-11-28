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
query ChekIsVerified($id: Int) {
  user(id: $id) {
    id
    name
    email
    phone
    isVerified
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