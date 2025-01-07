import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useGetId = () => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        setUserId(storedUserId ? Number(storedUserId) : null);
      } catch (err) {
        console.error("Error retrieving userId from AsyncStorage:", err);
      }
    };

    fetchUserId();
  }, []);


  return userId;
};
