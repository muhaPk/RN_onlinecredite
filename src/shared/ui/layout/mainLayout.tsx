import React, {FC, ReactNode} from 'react';
import {View, ScrollView} from 'react-native'
import { Header } from './header';
import { useAuthCheckProtected } from 'shared/hooks/useAuthCheckProtected';


type Props = {
  children: ReactNode
  checkProtected: boolean
};

export const MainLayout: FC<Props> = ({children, checkProtected}: Props) => {

  checkProtected && useAuthCheckProtected()

    return (

      <View className='flex-1'>

          <Header />
          <ScrollView className='flex-1 bg-white'>{children}</ScrollView>

      </View>


    );
};
