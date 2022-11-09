import * as React from 'react';
import { Button, View, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Register from './Register';
import Login from './Login';
import AllPasswords from './AllPasswords';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function LogoTitle() {
  return (
    <Image
      style={{ width: 109, height: 35,  }}
      source={require('../assets/pwdly_White_Logo_1.png')}
    />
  );
}

const Drawer = createDrawerNavigator();

function Dashboard() {
  return (
    
        <Drawer.Navigator 
            useLegacyImplementation={true} 
            initialRouteName="Vaults"
            screenOptions={{
                drawerStyle: {
                backgroundColor: '#363535',
                width: 240,
                },
                headerTitle: (props) => <LogoTitle/>,
                headerStyle: {
                  backgroundColor: '#4681D0',
                },
                headerTitleStyle: {
                  color: '#ffffff',
                  fontFamily: ''
                },
                headerTintColor: 'white',
            }}
            options={{
              title: 'pwdly'
            }}
        >
          <Drawer.Screen 
              name="All Passwords" 
              component={AllPasswords} 
              options={{
                  drawerIcon: ({focused, size}) => (
                      <MaterialCommunityIcons
                          name="lock"
                          size={24}
                          color={focused ? '#fffffff' : '#fff'}
                      />
                  ),
                  drawerActiveTintColor: "white",
                  drawerLabel: "All Passwords",
                  drawerLabelStyle: {
                    color: "white"
                  }
              }}
          />
          <Drawer.Screen 
            name="Vaults" 
            component={Register} 
            options={{
                  drawerIcon: ({focused, size}) => (
                      <MaterialCommunityIcons
                          name="safe"
                          size={24}
                          color={focused ? '#fffffff' : '#fff'}
                      />
                  ),
                  title: "Vaults",
                  drawerActiveTintColor: "white",
                  drawerLabel: "Vaults",
                  drawerLabelStyle: {
                    color: "white"
                  }
              }}
          />
          <Drawer.Screen 
            name="Password Generator" 
            component={Login} 
            options={{
                  drawerIcon: ({focused, size}) => (
                      <MaterialCommunityIcons
                          name="shield-sword"
                          size={24}
                          color={focused ? '#fffffff' : '#fff'}
                      />
                  ),
                  title: "Password Generator",
                  drawerActiveTintColor: "white",
                  drawerLabel: "Password Generator",
                  drawerLabelStyle: {
                    color: "white"
                  }
              }}
          />
        </Drawer.Navigator>
    
  );
}
export default Dashboard;