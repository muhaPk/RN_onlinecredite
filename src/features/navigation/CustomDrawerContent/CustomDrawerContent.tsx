import React, {FC} from 'react';
import { Text, View } from 'react-native';
import { T } from 'shared/ui/CustomText/CustomText';
import { DrawerContentScrollView, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Lang } from 'shared/lang';


export const CustomDrawerContent: FC<DrawerContentComponentProps> = (props) => {

    const { menu } = Lang()

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

            <DrawerItem
                label={menu.registration}
                onPress={() => props.navigation.navigate('Registration')}
            />

            <DrawerItem
                label={menu.login}
                onPress={() => props.navigation.navigate('Login')}
            />


        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;
