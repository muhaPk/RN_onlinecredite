import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'shared/hooks/useNavigate';

export const useAuthCheckProtected = () => {

  const { navigateToPage } = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      // console.log("accessToken: ", accessToken);

      if (!accessToken) {
        console.warn("No access token found, redirecting to Login.");
        navigateToPage("Login");
        return;
      }

      try {
        // Decode token to check for expiry
        const { exp } = jwtDecode<{ exp: number }>(accessToken);
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

        if (exp < currentTime) {
          console.warn("Access token expired, redirecting to Login.");
          navigateToPage("Login");
        }
      } catch (error) {
        console.error("Invalid access token, redirecting to Login.");
        navigateToPage("Login");
      }
    };

    checkToken();
  }, []);
};

