import React, {FC, ReactNode} from 'react';
import {Pressable} from 'react-native'
import {useNavigation, NavigationProp} from "@react-navigation/native";
import { RootStackParamList } from '../layout/rootStackParamList'
import { useAuth } from 'shared/hooks/useAuth';

type Props = {
    children: ReactNode;
    page: keyof RootStackParamList;
  };

export const PressableNavigation: FC<Props> = ({children, page}) => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const { isVerified } = useAuth()
    
    const targetPage =
        (page === 'Home' || page === 'Cabinet') && isVerified ? 'BottomTabs' : page
    
    const targetParams =
        (page === 'Home' || page === 'Cabinet') && isVerified
        ? { screen: page }
        : undefined;


    return (
        <Pressable onPress={() => navigation.navigate(targetPage, targetParams)} >
            {children}
        </Pressable>
    )
}