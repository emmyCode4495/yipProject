// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Login from './src/Auth/Login'
// import Register from './src/Auth/Register'
// import Welcome from './src/Auth/Onboarding/Welcome'
// import BottomTabs from './src/BottomTabsPage/BottomTabs'


// const Stack = createNativeStackNavigator();

// const App = () => {
//    return (
//     <Stack.Navigator
//     screenOptions={{
//         headerShown:false
//     }}
//     initialRouteName='welcome'
//     >
    
//        <Stack.Screen name="login" component={Login} />
//          <Stack.Screen name="register" component={Register} />
//           <Stack.Screen name="welcome" component={Welcome} />
//            <Stack.Screen name="bottomtabs" component={BottomTabs} />
//     </Stack.Navigator>
//   );
// }

// export default App

// const styles = StyleSheet.create({})

import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';

import Login from './src/Auth/Login'
import Register from './src/Auth/Register'
import Welcome from './src/Auth/Onboarding/Welcome'
import BottomTabs from './src/BottomTabsPage/BottomTabs'

const Stack = createNativeStackNavigator();

// Component to handle navigation based on auth status
const AppNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
  
         <Stack.Screen name="bottomtabs" component={BottomTabs} />
      ) : (
        <>
        <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="register" component={Register} />
          <Stack.Screen name="welcome" component={Welcome} />
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