import axios from 'axios';

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await axios.post('/auth/refresh', { refreshToken });
    if (response.status === 200) {
      return {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken, // Only if your backend issues a new refresh token
      };
    } else {
      console.warn("Failed to refresh token: Non-200 response.");
      return null;
    }
  } catch (error) {
    console.error("Error refreshing access token: ", error);
    return null;
  }
};
