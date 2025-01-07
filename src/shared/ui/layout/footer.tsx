import React from 'react';
import {View, Text} from 'react-native'
import {useNavigation} from "@react-navigation/native";

export const Footer = () => {

    const navigation = useNavigation();

    return (
        <View className="flex-none flex-row justify-center p-4">

          <Text className="text-gray-500">onlinecredite, 2024</Text>

        </View>
    );
};



