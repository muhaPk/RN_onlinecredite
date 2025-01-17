import axios from 'axios';

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await axios.post('/auth/refresh', { refreshToken });
    if (response.status === 200) {
      return {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      }
    } else {
      console.warn("sh token: Non-200 response.");
      return null;
    }
  } catch (error) {
    console.log('Error refreshing access token: ' + JSON.stringify(error, null, 2))
    return null;
  }
};
