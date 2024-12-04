import { useMemo } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "shared/ui/layout/rootStackParamList";
import { useAuth } from 'shared/hooks/useAuth';

export const useNavigate = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isVerified } = useAuth()

  return useMemo(() => {
    const navigateToPage = (page: keyof RootStackParamList) => {

      const targetPage =
        (page === 'Home' || page === 'Cabinet') && isVerified ? 'BottomTabs' : page
    
      const targetParams =
        (page === 'Home' || page === 'Cabinet') && isVerified
        ? { screen: page }
        : undefined;

      navigation.navigate(targetPage, targetParams);
    };

    return { navigateToPage }
  }, [navigation, isVerified]);

};

