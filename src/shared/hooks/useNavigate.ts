import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "shared/ui/layout/rootStackParamList";

export const useNavigate = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const navigateToPage = (page: keyof RootStackParamList) => {
    navigation.navigate(page);
  };

  return { navigateToPage }
};

