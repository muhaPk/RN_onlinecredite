import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'shared/hooks/useNavigate';
import { useLogoutHandler } from "./handleLogout";
import { isTokenExpired } from "shared/lib/isTokenExpired";

export const useAuthCheckProtected = () => {

  const { handleLogout } = useLogoutHandler();

  const { navigateToPage } = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      console.log("accessToken: ", accessToken);

      if (!accessToken) {
        console.warn("No access token found, redirecting to Login.");
        handleLogout()
        return;
      }

      if (isTokenExpired(accessToken)) {
        console.warn("Access token expired");
        navigateToPage("Login");
        return;
      }
    };

    checkToken();
  }, []);
};

