import * as React from 'react';
import { StyleSheet, Text, Button, View, Image, Pressable, TouchableOpacity, Alert } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Login from './Login';
import AllPasswords from './AllPasswords';
import Vaults from './Vaults';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VaultDrawerlabel from '../components/VaultDrawerLabel';
import { useVaults } from '../helpers/Hooks';
import { useQuery } from 'react-query';
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';



function LogoTitle() {
  return (
    <Image
      style={styles.logo}
      source={require('../assets/pwdly_White_Logo_1.png')}
    />
  );
}

const Drawer = createDrawerNavigator();

{/*Drawer components are defined here */}
const CustomDrawer = props => {
    const navigation = useNavigation();
    let token = "none"
    try {
        SecureStore.getItemAsync('pwdlytoken').then((response) => {token = response})
        
    } catch (error) {
        console.log(error);
    }
    const { data, isLoading, isError, error } = useQuery(["getVaults"], () => axios.get("https://pwdly.herokuapp.com/api/vault", { headers: { Authorization: `Bearer ${token}` } }));
    if(isLoading){
        return <Text>Loading</Text>
    }
    if(isError){
        Alert("Error: placeholder")
        return <Text>Error</Text>
    }
    const vaults = data.data.vaults;
    
	return(
		<View style={{flex: 1}}>
			<DrawerContentScrollView {...props} >
                {/*Drawer header*/}
				<View
				style={styles.navDrawerHeader}
				>
					{/*Hamburger menu header backarrow pressable*/}
					<Pressable onPress={() => { 
						navigation.navigate('Login');
						}}>
						<MaterialCommunityIcons
						name="arrow-left-box"
						size={40}
						color={'#625A5A'}
						/>
					</Pressable>
					{/* Hamburger menu header pwdly icon*/}
					<Image
						style={{ width: 90, height: 29,  }}
						source={require('../assets/pwdly_White_Logo_1.png')}
					/>
				</View>
                {/*Allpasswords label and Password generator label defined in <Drawer.navigator> */}
				<DrawerItemList {...props}/>
                {/*Collapsable for user's vaults*/}
                <VaultDrawerlabel vaults={vaults} />
			</DrawerContentScrollView>

			{/*Settings button at bottom of drawer*/}
			<TouchableOpacity
				style={styles.navbarFooter}
				onPress={() => navigation.navigate('AllPasswords')}
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

function Dashboard() {
  return (
    
        <Drawer.Navigator 
            drawerContent={(props) => <CustomDrawer{...props}/>}
            useLegacyImplementation={true} 
            initialRouteName="AllPasswords"
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
              name="AllPasswords" 
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
          {/*This tab is hidden in place of the VaultDrawerLabel component*/} 
          <Drawer.Screen 
            name="Vaults" 
            component={Vaults} 
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
                  },
                  drawerItemStyle: { display: 'none' }
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
