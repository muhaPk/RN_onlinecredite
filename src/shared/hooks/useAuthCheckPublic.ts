import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'shared/hooks/useNavigate';

export const useAuthCheckPublic = () => {

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


    };

    checkToken();
  }, []);
};

