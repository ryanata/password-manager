import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import VaultRow from './components/VaultRow';
import VaultTable from './components/VaultTable';
import VaultPage from './pages/VaultPage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createContext, useState } from 'react';

import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';



export default function App() {
  //const UserContext = createContext(null);

  const Stack = createNativeStackNavigator();

  const queryClient = new QueryClient();

  //const [id, setId] = useState('none');
  
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator intialRouteName="Login" screenOptions={
          {
            headerShown: false
          }
        }>
          {/*<Stack.Screen name="Dashboard" component={Dashboard} />*/}
          {/*<Stack.Screen name="passwordRow" component = {passwordRow} />*/}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Register} />
          {/*<UserContext.Provider value = {{value, setId}}>*/}
          <Stack.Screen name="Dashboard" component={Dashboard} />
          {/*<Stack.Screen name="VaultRow" component = {VaultRow} />
          <Stack.Screen name="VaultTable" component = {VaultTable}/>*/} 
          {/*</UserContext.Provider>*/}
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}