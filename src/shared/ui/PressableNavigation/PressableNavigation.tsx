import React, {FC, ReactNode} from 'react';
import {Pressable} from 'react-native'
import {useNavigation, NavigationProp} from "@react-navigation/native";
import { RootStackParamList } from '../layout/rootStackParamList'
import { useAuth } from 'shared/hooks/useAuth';

type Props = {
    children: ReactNode;
    page: keyof RootStackParamList;
  };


const bottomTabPages = [ 'Home', 'Cabinet' ] // Pages in bottom tabs

export const PressableNavigation: FC<Props> = ({children, page}) => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const { isVerified } = useAuth()

    const isBottomTabPage = bottomTabPages.includes(page) && isVerified;
    
    if (isBottomTabPage) {
        return (
            <Pressable onPress={() => navigation.navigate('BottomTabs', { screen: page })}>
                {children}
            </Pressable>
        );
    }

    return (
        <Pressable onPress={() => navigation.navigate(page)}>
            {children}
        </Pressable>
    );
}