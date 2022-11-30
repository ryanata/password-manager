import * as React from 'react';
import { StyleSheet, Text, Button, View, Image, Pressable, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Register from './Register';
import Login from './Login';
import passwordRow from '../components/VaultRow';
import VaultTable from '../components/VaultTable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useUser, VaultContext}  from '../hooks/getAllVaultsQuery';
import {useState, useMemo} from 'react';
import axios from 'axios';



function LogoTitle() {
  return (
    <Image
      style={styles.logo}
      source={require('../assets/logo.png')}
    />
  );
}

const Drawer = createDrawerNavigator();


const CustomDrawer = props => {

  const navigation = useNavigation();
  return(
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props} >
        <View
          style={styles.navDrawerHeader}
        >
          <Pressable onPress={() => { 
              navigation.navigate('Login');
            }}>
            <MaterialCommunityIcons
              name="arrow-left-box"
              size={40}
              color={'#625A5A'}
            />
          </Pressable>
          <Image
            style={{ width: 90, height: 29,  }}
            source={require('../assets/logo.png')}
          />
        </View>
        <DrawerItemList {...props}/>

      </DrawerContentScrollView>

      <TouchableOpacity
        style={styles.navbarFooter}
        onPress={() => console.log("Account Settings Button")}
      >
        <Ionicons
          name="settings-outline"
          size={30}
          color={'#ffffff'}
        />
        <Text style={{color: 'white', fontWeight: "500"}}>Account Settings</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const VaultProvider = ({ vaultIds, children }) => {
    // Go through all vaults Ids and create an object like this:
    // {
    //     "vaultId1": {
    //         "unlocked": false,
    //      }
    // }
    const intialVault = vaultIds.reduce((acc, vaultId) => {
        acc[vaultId] = {
            unlocked: false,
        };
        return acc;
    }, {});

    const [vaultStates, setVaultStates] = useState(intialVault);
    const value = useMemo(
        () => ({
            vaultStates,
            setVaultStates,
        }),
        [vaultStates]
    );

  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
};



function Dashboard() {
  
  const call  = useUser();

  //const result = axios.get("https://pwdly.herokuapp.com/api/user/me", { headers: { Authorization: `Bearer ${token}` } });

  //console.log(isLoading);
//   if (isLoading) {
//     return (
//         <Text>Loading</Text>
//     );  
//   }

// // Kick them out if invalid jwt
//   if (error) {
//     return (
//         <Text>Error</Text>
//     );
//   }

  //console.log(result.data.vaults);
  //alert(call);
  //console.log(result.data.vaults);
  console.log(call);
  const vaults = [];
  return (
    <VaultProvider vaultIds={vaults}>
      <Drawer.Navigator 
          drawerContent={(props) => <CustomDrawer{...props}/>}
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
              drawerLabel: (props) => <DrawerHeader/>
          }}
          options={{
            title: 'pwdly'
          }}
      >
        <Drawer.Screen 
            name="All Passwords" 
            component={VaultTable} 
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
          name="Password Generator" 
          component={Register} 
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
    </VaultProvider>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
  logo: {
    width: 109, 
    height: 35,
  },
  navDrawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  navbarFooter: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#363535',
    padding: 20,
    alignItems: 'center',
    borderTopColor: 'white',
    borderTopWidth: 0.19,
  },
  navDrawerStyle: {
    backgroundColor: '#363535',
    width: 240,
  }
});
export default Dashboard;