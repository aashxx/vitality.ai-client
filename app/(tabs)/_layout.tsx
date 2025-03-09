import React from 'react';
import { Tabs } from 'expo-router';
import TabIcon from '@/components/tab-icon';
import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          flex: 1, 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center',
        }, 
        tabBarStyle: {
          alignItems: 'center',
          borderWidth: 1,
          height: 70, 
          justifyContent: 'center'
        }
      }}
    >
      <Tabs.Screen 
        name='home'
        options={{ 
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              focused={focused} 
              iconName={'home'} 
              IconComponent={Foundation} 
            />
          )
        }}
      />
      <Tabs.Screen 
        name='predict'
        options={{ 
          title: 'Predict',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              focused={focused} 
              iconName={'brain'}
              IconComponent={FontAwesome5}
            />
          )
        }}
      />
      <Tabs.Screen 
        name='care'
        options={{ 
          title: 'Care',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              focused={focused} 
              iconName={'book-medical'} 
              IconComponent={FontAwesome6}
            />
          )
        }}
      />
      <Tabs.Screen 
        name='profile'
        options={{ 
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              focused={focused} 
              iconName={'user-alt'} 
              IconComponent={FontAwesome5}
            />
          )
        }}
      />
    </Tabs>
  )
}

export default _Layout;