import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './BottomTabsScreens/Home'


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
       <Tab.Navigator
       screenOptions={{ headerShown:false}}
       >
      <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="list" component={Home} />
     <Tab.Screen name="profile" component={Home} />
    </Tab.Navigator>
  )
}

export default BottomTabs

const styles = StyleSheet.create({})