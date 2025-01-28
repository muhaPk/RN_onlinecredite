import React, {useEffect, useRef} from 'react';
import { StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MainLayout } from 'shared/ui/layout/mainLayout';
import { Home } from 'pages/home/Home';
import { Settings } from 'pages/settings/Settings';
import { Registration } from 'pages/registration/Registration'
import { Contacts } from 'pages/contacts/Contacts'
import { Passport } from 'pages/passport/Passport';
import { Map } from 'pages/map/Map';
import { Routes } from 'pages/routes/Routes';
import { Login } from 'pages/login/Login';
import {CustomDrawerContent} from './src/features/navigation/CustomDrawerContent/CustomDrawerContent'
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { BottomTabs } from 'shared/ui/layout/BottomTabs';
import { useAuth } from 'shared/hooks/useAuth';

import { NavigationContainerRef } from '@react-navigation/native';
import { useLanguageEffect } from 'shared/hooks/useLanguageEffect';

const Drawer = createDrawerNavigator();


export default function App() {
  useLanguageEffect()

  return (
        <>
          <Navigator />
          <StatusBar backgroundColor='#354052' />
        </>
  );
}

const Navigator = () => {

  const { isVerified } = useAuth()

  // console.log('App: isVerified ' + isVerified)
  
  const navigationRef = useRef<NavigationContainerRef>(null)

  useEffect(() => {
    if (!isVerified && navigationRef.current) {
      navigationRef.current.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  }, [isVerified]);


  return (
    <NavigationContainer>

        <Drawer.Navigator 
          initialRouteName={isVerified ? 'BottomTabs' : 'Home'}
          screenOptions={{headerShown: false, unmountOnBlur: true}}
          drawerContent={(props: DrawerContentComponentProps) => <CustomDrawerContent {...props} />}
          >
            
          <Drawer.Screen name="BottomTabs" component={BottomTabs} />

          <Drawer.Screen name="Home">
            {() => (<MainLayout checkProtected={false}><Home /></MainLayout>)}
          </Drawer.Screen>

          
          <Drawer.Screen name="Registration">
            {() => (<MainLayout checkProtected={false}><Registration /></MainLayout>)}
          </Drawer.Screen>

          <Drawer.Screen name="Login">
            {() => (<MainLayout checkProtected={false}><Login /></MainLayout>)}
          </Drawer.Screen>

          <Drawer.Screen name="Contacts">
            {() => (<MainLayout checkProtected={false}><Contacts /></MainLayout>)}
          </Drawer.Screen>

          <Drawer.Screen name="Settings">
            {() => (<MainLayout checkProtected={true}><Settings /></MainLayout>)}
          </Drawer.Screen>

          <Drawer.Screen name="Passport">
            {() => (<MainLayout checkProtected={true}><Passport /></MainLayout>)}
          </Drawer.Screen>

          <Drawer.Screen name="Map">
            {() => (<MainLayout checkProtected={false}><Map /></MainLayout>)}
          </Drawer.Screen>

          <Drawer.Screen name="Routes">
            {() => (<MainLayout checkProtected={false}><Routes /></MainLayout>)}
          </Drawer.Screen>


        </Drawer.Navigator>

    </NavigationContainer>
  )
}
