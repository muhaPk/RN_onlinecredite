import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CHECK_IS_VERIFIED } from "shared/api/graphql/queries/user";

export const useAuth = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  // console.log(userId + ': ' + isVerified)

  const [triggerQuery, { loading }] = useLazyQuery(CHECK_IS_VERIFIED, {
    onCompleted: (data) => {
      setIsVerified(data?.user?.isVerified || false);
    },
    onError: (error) => {

      const unauthorizedError = error.graphQLErrors.find( err => err.message === "Unauthorized")
      unauthorizedError && AsyncStorage.multiRemove(["accessToken", "refreshToken", "userId"])
      console.log('forced logout successfull')
    },
  });

  // Fetch userId from AsyncStorage
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

  useEffect(() => {

    if (!userId) return;
    triggerQuery({ variables: { id: userId } });
    
  }, [userId, triggerQuery]);

  return { isVerified, loading };
};
