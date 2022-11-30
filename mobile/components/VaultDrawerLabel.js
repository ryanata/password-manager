import * as React from 'react';
import { StyleSheet, Text, Button, View, Image, Pressable, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import Vaults from '../pages/Vaults';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
{/*Vault data Placeholder. Replace with real vault data implementation */}
const vaults = [
    {
        id: '1',
        vaultName: 'School'
    },
    {
        id: '2',
        vaultName: 'Work'
    }
]

const VaultDrawerlabel = (navigation) => {
    const [isCollapsed, setCollapsed] = React.useState(true);
    
    return(
        <View>
            <DrawerItem 
            label="Vaults"
            labelStyle={{color: 'white'}}
            onPress={() => {isCollapsed ? setCollapsed(false) : setCollapsed(true)}}
            icon={({focused, size}) => (
                    <MaterialCommunityIcons
                        name="safe"
                        size={24}
                        color={focused ? '#fffffff' : '#fff'}
                    />
                )}
            focused={!isCollapsed}
            />
            <Collapsible collapsed={isCollapsed} style={{alignItems: 'center'}}>
            {vaults.map((vault, index) => {
                return (
                <TouchableOpacity onPress={() => {navigation.navigate('Vaults')}} style={{padding: 10}} key={index}>
                    <Text style={{color: 'white', fontSize: 15}}>{vault.vaultName}</Text>
                </TouchableOpacity>
                );
            })}
                
            </Collapsible>            
        </View>
    );
}

export default VaultDrawerlabel;