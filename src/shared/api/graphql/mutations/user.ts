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
      userId
    }
  }
`;

export const LOGOUT = gql`
  mutation logout($id: Int, $isVerified: boolean) {
    updateUser(id: $userId, isVerified: isVerified)
  }
`;