import React, {FC, ReactNode} from 'react';
import {View, Text, Pressable} from 'react-native'
import {useNavigation, NavigationProp} from "@react-navigation/native";
import { RootStackParamList } from '../layout/rootStackParamList'

type Props = {
    children: ReactNode;
    page: keyof RootStackParamList;
  };

export const PressableNavigation: FC<Props> = ({children, page}) => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <Pressable onPress={() => navigation.navigate(page)} >
            {children}
        </Pressable>
    )
}