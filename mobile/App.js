import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AllPasswords from './pages/AllPasswords';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createContext, useState } from 'react';

import * as React from 'react';

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
          <Stack.Screen name="Login" component={Login} />
          {/*<Stack.Screen name = "AllPasswords" component = {AllPasswords}/>*/}
          <Stack.Screen name="Signup" component={Register} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}