import { gql } from '@apollo/client';

export const CHECK_IS_VERIFIED = gql`
query FindUserByParams($params: UserFilterInput!) {
  findUserByParams(params: $params) {
    id
    name
    isVerified
  }
}
`;