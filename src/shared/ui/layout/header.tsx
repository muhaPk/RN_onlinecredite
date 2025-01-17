import React, {FC} from 'react';
import {Button, View, Text, Image} from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'
import { T } from '../CustomText/CustomText';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from './rootStackParamList';
import { useAuth } from 'shared/hooks/useAuth';


export const Header: FC = () => {

    const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();

    return (
        <View className="flex-none flex-row justify-between p-4 bg-white">

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
