import React from 'react';
import {View, Text, Pressable} from 'react-native'
import {useNavigation, NavigationProp} from "@react-navigation/native";
import { RootStackParamList } from '../layout/rootStackParamList'
import { viewStyleVariants, textStyleVariants } from 'shared/styles/buttonStyles';


type Props = {
    title: string
    page: keyof RootStackParamList
    colorStyle?: 'dark' | 'light'
    className?: string
}

export const LinkButton = ({title, page, colorStyle = 'dark', ...rest}: Props) => {


    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        
        <Pressable onPress={() => navigation.navigate(page)}>
            <View className={viewStyleVariants[colorStyle]} {...rest}>
                <Text className={textStyleVariants[colorStyle]}>{title}</Text>
            </View>
        </Pressable>

    )
}