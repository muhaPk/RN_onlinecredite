import React, { FC, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { T } from 'shared/ui/CustomText/CustomText';
import { DrawerContentScrollView, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Lang } from 'shared/lang';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useQuery } from '@apollo/client';
import { CHECK_IS_VERIFIED } from 'shared/api/graphql/queries/user';
import { LOGOUT } from 'shared/api/graphql/mutations/user';

export const CustomDrawerContent: FC<DrawerContentComponentProps> = (props) => {
    
    const { menu } = Lang()
    
    const [userId, setUserId] = useState<number | null>(null);
    const [isVerified, setIsVerified] = useState<boolean>(false);


        useEffect(() => {
            const fetchUserId = async () => {
                const storedUserId = await AsyncStorage.getItem("userId");
                storedUserId && setUserId(Number(storedUserId))
            }
            fetchUserId()
        }, []);
        

        const handleLogout = async () => {
            try {
                await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userId']);
    
                // const data = useQuery(LOGOUT, {
                //     variables: { id: userId, isVerified: false }
                // })
                // data && console.log('handleLogout data: ' + JSON.stringify(data, null, 2))
    
                props.navigation.navigate('Login'); // Redirect to Login screen
    
    
            } catch (error) {
                console.error('Error during logout:', error);
            }
          };



        const { loading, error } = useQuery(CHECK_IS_VERIFIED, {
                variables: { id: userId },
                skip: !userId,
                onCompleted: data => data?.user && setIsVerified(data.user.isVerified)
        });

        
        
        if (loading) {
            console.log("Loading...");
            return null; // or a loading indicator
        }
        
        if (error) {
            console.error("GraphQL Error:", error);

            if (error.message == 'Unauthorized') {
            //     handleLogout()
                AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userId']);
            }
            

        }






    return (
        <DrawerContentScrollView {...props}>

            <View className='bg-[#29aae2] -mt-1'>
                <View className='px-4 py-2 flex-row justify-between'>
                    <T className='color-white'>Язык:</T>
                    <T className='color-white'>ru / ro</T>
                </View>
            </View>

            <DrawerItem
                label={menu.home}
                onPress={() => props.navigation.navigate('Home')}
            />

            <DrawerItem
                label={menu.contacts}
                onPress={() => props.navigation.navigate('Contacts')}
            />

            {
                !isVerified && 
                <DrawerItem
                    label={menu.registration}
                    onPress={() => props.navigation.navigate('Registration')}
                />
            }
            {
                !isVerified && 
                <DrawerItem
                    label={menu.login}
                    onPress={() => props.navigation.navigate('Login')}
                />
            }
            {
                isVerified && 
                <DrawerItem
                    label={menu.cabinet}
                    onPress={() => props.navigation.navigate('Cabinet')}
                />
            }
            {
                isVerified && 
                <DrawerItem
                    label={menu.logout}
                    onPress={handleLogout}
                />
            }


        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;
