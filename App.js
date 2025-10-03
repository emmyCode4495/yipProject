import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';

import Login from './src/Auth/Login'
import Register from './src/Auth/Register'
import Welcome from './src/Auth/Onboarding/Welcome'
import BottomTabs from './src/BottomTabsPage/BottomTabs'
import ItemDetailsScreen from './src/OtherPages/ItemDetailsScreen';

const Stack = createNativeStackNavigator();


const AppNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
         <Stack.Screen name="bottomtabs" component={BottomTabs} />
         <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} />
        </>
        
      ) : (
        <>
        <Stack.Screen name="welcome" component={Welcome} />
        <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="register" component={Register} />
          
        </>
      )}
    </Stack.Navigator>
  );
};


export default function App() {
  return (
    <AuthProvider>
  
        <AppNavigator />
  
    </AuthProvider>
  );
}