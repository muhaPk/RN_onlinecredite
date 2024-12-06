import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'shared/hooks/useNavigate';
import { useLogoutHandler } from "./handleLogout";
import { isTokenExpired } from "shared/lib/isTokenExpired";
import { refreshAccessToken } from "shared/lib/refreshAccessToken";

export const useAuthCheckProtected = () => {

  const { handleLogout } = useLogoutHandler();
  const { navigateToPage } = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const refreshToken = await AsyncStorage.getItem("refreshToken");

      if (!accessToken) {
        console.warn("No access token found, redirecting to Login.");
        handleLogout()
        return;
      }

      console.log(accessToken)

      if (isTokenExpired(accessToken)) {
        console.warn("Access token expired, attempting to refresh...");
        if (refreshToken) {
          try {
            const newTokens = await refreshAccessToken(refreshToken);
            if (newTokens) {
              await AsyncStorage.setItem("accessToken", newTokens.accessToken);
              await AsyncStorage.setItem("refreshToken", newTokens.refreshToken);
              console.log("Access token successfully refreshed.");
              return; // Successfully refreshed; no need to log out or redirect.
            } else {
              console.warn("Failed to refresh tokens, logging out...");
              handleLogout();
            }
          } catch (error) {
            console.error("Error refreshing tokens: ", error);
            handleLogout();
          }
        } else {
          console.warn("No refresh token found, redirecting to Login.");
          handleLogout();
        }
        return;
      }

    };

    checkToken();
  }, []);
};

