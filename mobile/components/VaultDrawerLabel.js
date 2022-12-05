import * as React from 'react';
import { StyleSheet, Text, Button, View, Image, Pressable, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Vaults from '../pages/Vaults';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Collapsible from 'react-native-collapsible';
{/*Vault data Placeholder. Replace with real vault data implementation */}

const onPressVaultLabel = (navigation, vault) => {
    navigation.navigate('Vaults', {vault: vault})
    //console.log(vault.name)
} 


const VaultDrawerlabel = ({vaults}) => {
    const [isCollapsed, setCollapsed] = React.useState(true);
    const navigation = useNavigation();
    
    let token = "none";
    
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
                <TouchableOpacity onPress={() => {onPressVaultLabel(navigation, vault)}} style={{padding: 10}} key={index}>
                    <Text style={{color: 'white', fontSize: 15}}>{vault.name}</Text>
                </TouchableOpacity>
                );
            })}
                
            </Collapsible>            
        </View>
    );
}

export default VaultDrawerlabel;