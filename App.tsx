import React from 'react';
import { StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { MainLayout } from 'shared/ui/layout/mainLayout';

import { Home } from 'pages/home/Home';
import { Settings } from 'pages/settings/Settings';
import { Registration } from 'pages/registration/Registration'
import { Contacts } from 'pages/contacts/Contacts'
import { Cabinet } from 'pages/cabinet/Cabinet'
import { Login } from 'pages/login/Login';
import {CustomDrawerContent} from './src/features/navigation/CustomDrawerContent/CustomDrawerContent'




const Drawer = createDrawerNavigator();


export default function App() {

  return (
        <>
          <Navigator />
          <StatusBar backgroundColor='#354052' />
        </>
  );
}

const Navigator = () => {

  return (
    <NavigationContainer>



        <Drawer.Navigator 
          initialRouteName="Home" 
          screenOptions={{headerShown: false, unmountOnBlur: true}}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          >

          <Drawer.Screen name="Home">
            {() => (<MainLayout check={false}><Home /></MainLayout>)}
          </Drawer.Screen>

          <Drawer.Screen name="Registration">
            {() => (<MainLayout check={false}><Registration /></MainLayout>)}
          </Drawer.Screen>

          <Drawer.Screen name="Login">
            {() => (<MainLayout check={false}><Login /></MainLayout>)}
          </Drawer.Screen>

          <Drawer.Screen name="Contacts">
            {() => (<MainLayout check={false}><Contacts /></MainLayout>)}
          </Drawer.Screen>

          <Drawer.Screen name="Settings">
            {() => (<MainLayout check={true}><Settings /></MainLayout>)}
          </Drawer.Screen>


          <Drawer.Screen name="Cabinet">
            {() => (<MainLayout check={true}><Cabinet /></MainLayout>)}
          </Drawer.Screen>


        </Drawer.Navigator>



    </NavigationContainer>
  )
}
