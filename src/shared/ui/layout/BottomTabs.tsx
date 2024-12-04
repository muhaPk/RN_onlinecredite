import React, {useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Home } from 'pages/home/Home';
import { Cabinet } from 'pages/cabinet/Cabinet';
import { MainLayout } from './mainLayout';


const Tab = createBottomTabNavigator();

export const BottomTabs = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            Home: focused ? 'home' : 'home-outline',
            Cabinet: focused ? 'person-circle' : 'person-circle-outline',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#29aae2',
        tabBarInactiveTintColor: 'gray',
      })}
    >

    <Tab.Screen name="Home" options={{headerShown: false }}>
        {() => (
          <MainLayout check={false}>
            <Home />
          </MainLayout>
        )}
      </Tab.Screen>

      <Tab.Screen name="Cabinet" options={{headerShown: false }}>
        {() => (
          <MainLayout check={true}>
            <Cabinet />
          </MainLayout>
        )}
      </Tab.Screen>

    </Tab.Navigator>
  );
};
