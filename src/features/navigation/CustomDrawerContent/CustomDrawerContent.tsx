import React, { FC, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { T } from 'shared/ui/CustomText/CustomText';
import { DrawerContentScrollView, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Lang } from 'shared/lang';
import { useLogoutHandler } from 'shared/hooks/handleLogout';
import { useDrawerStatus } from '@react-navigation/drawer';
import { useAuth } from 'shared/hooks/useAuth';

export const CustomDrawerContent: FC<DrawerContentComponentProps> = (props) => {

    
    const isDrawerOpen = useDrawerStatus();
    const { isVerified, loading } = useAuth();
    const [isDrawerVerified, setIsDrawerVerified] = useState<boolean>(false);

    console.log('isVerified ' + isVerified)

    const { menu } = Lang()
    const { handleLogout } = useLogoutHandler();

    useEffect(() => {
        if (!loading) {
            setIsDrawerVerified(isDrawerOpen === "open" && isVerified);
          }
      }, [isDrawerOpen, isVerified, loading]);



    if (loading) {
        return <ActivityIndicator size="large" color="#29aae2" />;
    }

    return (
        <DrawerContentScrollView {...props}>



            <DrawerItem
                label={menu.home}
                onPress={() => props.navigation.navigate('BottomTabs', { screen: 'Home' })}
            />

            {
                !isDrawerVerified && 
                <DrawerItem
                label={menu.registration}
                onPress={() => props.navigation.navigate('Registration')}
                />
            }
            {
                !isDrawerVerified && 
                <DrawerItem
                label={menu.login}
                onPress={() => props.navigation.navigate('Login')}
                />
            }

            <View className='px-5 py-2 flex-row justify-between'>
                <T className=''>{menu.iazik}</T>
            </View>

            {
                isDrawerVerified && 
                <DrawerItem
                label={menu.cabinet}
                onPress={() => props.navigation.navigate('BottomTabs', { screen: 'Cabinet' })}
                />
            }

            {
                // isDrawerVerified && 
                <DrawerItem
                label={menu.passport}
                onPress={() => props.navigation.navigate('Passport')}
                />
            }


            <DrawerItem
                label={menu.contacts}
                onPress={() => props.navigation.navigate('Contacts')}
            />

            {
                <DrawerItem
                    label={menu.map}
                    onPress={() => props.navigation.navigate('Map')}
                />
            }

            {
                isDrawerVerified && 
                <DrawerItem
                    label={menu.logout}
                    onPress={() => {
                        setIsDrawerVerified(false)
                        handleLogout()
                    }}
                />
            }


        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;
