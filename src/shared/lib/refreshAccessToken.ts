import axios from 'axios';
import { REACT_APP_URI } from 'shared/config/consts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const refreshAccessToken = async (refreshToken: string) => {

  try {

    const response = await axios.post(`${REACT_APP_URI}/auth/refresh`, { refreshToken });

    if (response.status === 200 || response.status === 201) {
      console.log('tokens access refreshing')
      return {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      }
    } else {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        // Clear tokens and redirect to login page
        console.warn("sh token: Non-200 response.");
        return null;
    }

  } catch (error: any) {
    console.error('Error refreshing access token:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      // Handle specific unauthorized case (e.g., redirect to login).
      console.error('Refresh token is invalid or expired.');
    }
    return null;
  }
};
