import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Lang } from 'shared/lang';
import { useLogoutHandler } from 'shared/hooks/handleLogout';
import { useDrawerStatus } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome6Icons from 'react-native-vector-icons/FontAwesome6'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import EntypoIcons from 'react-native-vector-icons/Entypo'
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IconWrapperProps {
    IconComponent: React.ComponentType<{ name: string; size: number; color: string }>;
    name: string;
    isActive: boolean;
  }

const IconWrapper: FC<IconWrapperProps> = ({ IconComponent, name, isActive }) => (
    <View className='flex-row justify-center w-6'>
      <IconComponent name={name} size={22} color={isActive ? '#29aae2' : '#666'} />
    </View>
  );

  const getLabelStyle = (activeRouteName: string | undefined, routeName: string) => ({
    color: activeRouteName === routeName ? '#29aae2' : '#666',
    marginLeft: -20,
  });
  

export const CustomDrawerContent: FC<DrawerContentComponentProps> = (props) => {

    const isDrawerOpen = useDrawerStatus();

    const [isDrawerVerified, setIsDrawerVerified] = useState<boolean>(false);

    const { menu } = Lang()
    const { handleLogout } = useLogoutHandler();

    useEffect(() => {
        const fetchUserId = async () => {
          try {
            const storedUserId = await AsyncStorage.getItem("userId");
            setIsDrawerVerified(!!storedUserId)
          } catch (err) {
            console.error("useAuth: Error retrieving userId from AsyncStorage:", err);
          }
        }
        if (isDrawerOpen === 'open') fetchUserId()

      }, [isDrawerOpen])


    const { state, navigation } = props;

    const getActiveRouteName = (state: any): string | undefined => {
        const route = state.routes[state.index];
        if (route.state) {
            return getActiveRouteName(route.state);
        }
        return route.name;
    };
    
    const activeRouteName = getActiveRouteName(state);

    return (

        <View className='flex-1'>

            <View className='bg-blue h-40 flex justify-center items-center'>
                <Ionicons name="logo-microsoft" size={22} color="white" />
            </View>

            
            <DrawerContentScrollView {...props} className="flex-1">
            
                <DrawerItem
                    key={`Home-${isDrawerVerified}`}
                    focused={activeRouteName === 'Home'}
                    labelStyle={getLabelStyle(activeRouteName, 'Home')}
                    icon={() => <IconWrapper IconComponent={FontAwesomeIcons} name="home" isActive={activeRouteName === 'Home'} />}
                    label={menu.home}
                    onPress={() => navigation.navigate('BottomTabs', { screen: 'Home' })}
                />

                {
                    !isDrawerVerified && 
                    <DrawerItem
                        key={`Registration-${isDrawerVerified}`}
                        focused={activeRouteName === 'Registration'}
                        labelStyle={getLabelStyle(activeRouteName, 'Registration')}
                        icon={() => <IconWrapper IconComponent={MaterialIcons} name="app-registration" isActive={activeRouteName === 'Registration'} />}
                        label={menu.registration}
                        onPress={() => props.navigation.navigate('Registration')}
                    />
                }

                {
                    !isDrawerVerified && 
                    <DrawerItem
                        key={`Login-${isDrawerVerified}`}
                        focused={activeRouteName === 'Login'}
                        labelStyle={getLabelStyle(activeRouteName, 'Login')}
                        icon={() => <IconWrapper IconComponent={EntypoIcons} name="login" isActive={activeRouteName === 'Login'} />}
                        label={menu.login}
                        onPress={() => props.navigation.navigate('Login')}
                    />
                }


                {
                    isDrawerVerified && 
                    <DrawerItem
                        key={`Cabinet-${isDrawerVerified}`}
                        focused={activeRouteName === 'Cabinet'}
                        labelStyle={getLabelStyle(activeRouteName, 'Cabinet')}
                        icon={() => <IconWrapper IconComponent={MaterialIcons} name="account-circle" isActive={activeRouteName === 'Cabinet'} />}
                        label={menu.cabinet}
                        onPress={() => props.navigation.navigate('BottomTabs', { screen: 'Cabinet' })}
                    />
                }

                {
                    isDrawerVerified && 
                    <DrawerItem
                    key={`Passport-${isDrawerVerified}`}
                        focused={activeRouteName === 'Passport'}
                        labelStyle={getLabelStyle(activeRouteName, 'Passport')}
                        icon={() => <IconWrapper IconComponent={MaterialCommunityIcons} name="information" isActive={activeRouteName === 'Passport'} />}
                        label={menu.passport}
                        onPress={() => props.navigation.navigate('Passport')}
                    />
                }


                <DrawerItem
                    focused={activeRouteName === 'Contacts'}
                    labelStyle={getLabelStyle(activeRouteName, 'Contacts')}
                    icon={() => <IconWrapper IconComponent={MaterialCommunityIcons} name="information" isActive={activeRouteName === 'Contacts'} />}
                    label={menu.contacts}
                    onPress={() => props.navigation.navigate('Contacts')}
                />

                
                <DrawerItem
                    focused={activeRouteName === 'Map'}
                    labelStyle={getLabelStyle(activeRouteName, 'Map')}
                    icon={() => <IconWrapper IconComponent={FontAwesomeIcons} name="map-marker" isActive={activeRouteName === 'Map'} />}
                    label={menu.map}
                    onPress={() => props.navigation.navigate('Map')}
                />
            

            
                <DrawerItem
                    focused={activeRouteName === 'Routes'}
                    labelStyle={getLabelStyle(activeRouteName, 'Routes')}
                    icon={() => <IconWrapper IconComponent={FontAwesome6Icons} name="route" isActive={activeRouteName === 'Routes'} />}
                    label={menu.routes}
                    onPress={() => props.navigation.navigate('Routes')}
                />
                

                <View className='flex-grow'></View>

            </DrawerContentScrollView>

            {
                    isDrawerVerified && 
                    <DrawerItem
                        labelStyle={getLabelStyle(activeRouteName, 'Logout')}
                        icon={() => <IconWrapper IconComponent={MaterialCommunityIcons} name="logout" isActive={activeRouteName === 'Logout'} />}
                        label={menu.logout}
                        onPress={() => {
                            setIsDrawerVerified(false)
                            handleLogout()
                        }}
                    />
                }

        </View>

    );
};

export default CustomDrawerContent;
