import { gql } from '@apollo/client';

export const SEND_OTP = gql`
  mutation SendOtp($phone: String!) {
    sendOtp(phone: $phone)
  }
`;

export const VERIFY_OTP = gql`
  mutation VerifyOtp($phone: String!, $otp: String!) {
    verifyOtp(phone: $phone, otp: $otp) {
      accessToken
      refreshToken
      userId
    }
  }
`;

export const LOGOUT = gql`
  mutation logout($id: Int!, $isVerified: Boolean!) {
    updateUser(updateUserInput: { id: $id, isVerified: $isVerified }) {
      id
      isVerified
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($id_passport: String!, $email: String!, $phone: String!, $name: String!, $surname: String!) {
    createUser(createUserInput: { idPassport: $id_passport, email: $email, phone: $phone, name: $name, surname: $surname }) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: Int!, $name: String!, $surname: String!) {
    updateUser(updateUserInput: { id: $id, name: $name, surname: $surname }) {
      id
    }
  }
`;

export const UPLOAD_USER_PASSPORT = gql`
  mutation uploadUserPassport($id: Int!, $file: Upload!) {
    uploadUserPassport(id: $id, file: $file)
  }
`;

export const GOOGLE_AUTH_MUTATION = gql`
  mutation GoogleAuth($token: String!) {
    googleAuth(token: $token)
  }
`;