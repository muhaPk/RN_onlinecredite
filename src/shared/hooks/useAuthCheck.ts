import { useEffect } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "shared/ui/layout/rootStackParamList";
import { jwtDecode } from 'jwt-decode';

export const useAuthCheck = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      console.log("Token: ", token);

      if (!token) {
        console.warn("No access token found, redirecting to Home.");
        navigation.navigate("Home");
        return;
      }

      try {
        // Decode token to check for expiry
        const { exp } = jwtDecode<{ exp: number }>(token);
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

        if (exp < currentTime) {
          console.warn("Access token expired, redirecting to Home.");
          navigation.navigate("Home");
        }
      } catch (error) {
        console.error("Invalid access token, redirecting to Home.");
        navigation.navigate("Home");
      }
    };

    checkToken();
  }, [navigation]);
};

