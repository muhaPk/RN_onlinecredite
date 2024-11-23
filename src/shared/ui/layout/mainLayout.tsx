import React, {FC, ReactNode} from 'react';
import {View, ScrollView} from 'react-native'
import { Header } from './header';
import { useAuthCheck } from 'shared/hooks/useAuthCheck';


type Props = {
  children: ReactNode;
};

export const MainLayout: FC<Props> = ({children}: Props) => {

    useAuthCheck()

    return (


      <View className='flex-1'>

          <Header />

          <ScrollView className='flex-1 bg-white'>{children}</ScrollView>

      </View>


    );
};
