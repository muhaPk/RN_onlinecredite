import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLogoutHandler } from "./handleLogout";

export const useAuthCheckProtected = () => {

  const { handleLogout } = useLogoutHandler();

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      // console.log('accessToken ' + accessToken)

      if (!accessToken) {
        console.warn("No access token found, redirecting to Login.");
        handleLogout()
        return;
      }

    };

    checkToken();
  }, []);
};

