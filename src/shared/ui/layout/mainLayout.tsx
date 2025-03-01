import React, {FC, ReactNode} from 'react';
import {View, ScrollView, SafeAreaView} from 'react-native'
import { Header } from './header';
import { useAuthCheckProtected } from 'shared/hooks/useAuthCheckProtected';
import { useRoute } from '@react-navigation/native';

type Props = {
  children: ReactNode
  checkProtected: boolean
};

export const MainLayout: FC<Props> = ({children, checkProtected}: Props) => {

  const route = useRoute();
  checkProtected && useAuthCheckProtected()

    return (

      <SafeAreaView className='flex-1'>

          {/* {route.name !== 'Login' && <Header />} */}
          <Header />
          <ScrollView className='flex-1 bg-white' contentContainerStyle={{ flexGrow: 1 }}>{children}</ScrollView>

      </SafeAreaView>


    );
};
