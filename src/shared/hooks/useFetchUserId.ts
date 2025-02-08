import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useFetchUserId = (isDrawerOpen: string, setIsDrawerVerified: (verified: boolean) => void, closeLangOpen: () => void) => {
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        setIsDrawerVerified(!!storedUserId);
      } catch (err) {
        console.error("useAuth: Error retrieving userId from AsyncStorage:", err);
      }
    };

    if (isDrawerOpen === 'open') fetchUserId();
    if (isDrawerOpen === 'closed') closeLangOpen(); // close language switcher

  }, [isDrawerOpen, setIsDrawerVerified, closeLangOpen]);
}