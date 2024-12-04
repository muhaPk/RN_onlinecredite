import React, {FC} from 'react';
import {Button, View, Text, Image} from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'
import { PressableNavigation } from '../PressableNavigation/PressableNavigation';

import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from './rootStackParamList';


export const Header: FC = () => {

    const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();


    return (
        <View className="flex-none flex-row justify-between p-4">

          <PressableNavigation page='Home'>
            <Image className='h-9 w-20' source={require('../../../shared/assets/logo.png')} />
          </PressableNavigation>


          <Icon.Button 
            name="navicon" 
            size={30} 
            color="black" 
            backgroundColor="transparent" 
            underlayColor="transparent" 
            onPress={() => navigation.openDrawer()} 
          />

        </View>
    );
};
