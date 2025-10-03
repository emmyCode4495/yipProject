import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import ProfilePage from './BottomTabsScreens/ProfilePage'
import ListedItems from './BottomTabsScreens/ListedItems'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#C14242',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
      
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
     
      <Tab.Screen 
        name="list" 
        component={ListedItems}
        options={{
          tabBarLabel: 'Add Items',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons 
              name={focused ? "add-shopping-cart" : "add-shopping-cart"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="profile" 
        component={ProfilePage}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "person" : "person-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabs

const styles = StyleSheet.create({})