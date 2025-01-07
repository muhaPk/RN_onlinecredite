import { useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGOUT } from "shared/api/graphql/mutations/user";
import { useNavigate } from "shared/hooks/useNavigate";

export const useLogoutHandler = () => {
  const { navigateToPage } = useNavigate(); // Custom navigation hook


  const [logoutMutation] = useMutation(LOGOUT, {
    onCompleted: async () => {
      console.log('handleLogout: Logout success, starting AsyncStorage clearing.');
      try {
          await AsyncStorage.multiRemove(["accessToken", "refreshToken", "userId"]);
          navigateToPage("Login");
      } catch (error) {
          console.error('handleLogout: Error clearing AsyncStorage:', error);
      }
  },
  
    onError: (error) => {
      console.error("handleLogout: Logout failed:", error);
    },
  });

  const handleLogout = async () => {
    const storedUserId = await AsyncStorage.getItem("userId");
    if (!storedUserId) {
      console.error("handleLogout: No userId found in storage.");
      return;
    }
    const userId = Number(storedUserId);
    await logoutMutation({ variables: { id: userId, isVerified: false } });
  };

  return { handleLogout };
};
