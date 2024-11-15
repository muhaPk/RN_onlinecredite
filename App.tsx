import React from 'react';
import { StatusBar, View } from 'react-native';
import { Provider, useSelector } from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { MainLayout } from 'shared/ui/layout/mainLayout';

import { Home } from 'pages/home/Home';
import { Settings } from 'pages/settings/Settings';
import { Registration } from 'pages/registration/Registration'
import { Contacts } from 'pages/contacts/Contacts'
import { Login } from 'pages/login/Login';
import {CustomDrawerContent} from './src/features/navigation/CustomDrawerContent/CustomDrawerContent'

// import { Registration } from './src/pages/auth/Registration';
// import {Auth} from './src/pages/auth/Auth';
import { store } from './src/app/store/index';



const Drawer = createDrawerNavigator();


export default function App() {

  return (
    <Provider store={store}>
          <Navigator />
          <StatusBar backgroundColor='#354052' />
    </Provider>
  );
}

const Navigator = () => {

  // const isAuth = useSelector(state => state.users.isAuth)
  return (
    <NavigationContainer>



        <Drawer.Navigator 
          initialRouteName="Home" 
          screenOptions={{headerShown: false}}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          >

          <Drawer.Screen name="Home">
            {() => (<MainLayout><Home /></MainLayout>)}
          </Drawer.Screen>

          <Drawer.Screen name="Registration">
            {() => (<MainLayout><Registration /></MainLayout>)}
          </Drawer.Screen>

          <Drawer.Screen name="Settings">
            {() => (<MainLayout><Settings /></MainLayout>)}
          </Drawer.Screen>

          <Drawer.Screen name="Contacts">
            {() => (<MainLayout><Contacts /></MainLayout>)}
          </Drawer.Screen>

          <Drawer.Screen name="Login">
            {() => (<MainLayout><Login /></MainLayout>)}
          </Drawer.Screen>

        </Drawer.Navigator>



    </NavigationContainer>
  )
}
