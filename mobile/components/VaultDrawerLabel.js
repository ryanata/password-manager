import * as React from 'react';
import { StyleSheet, Text, Button, View, Image, Pressable, TouchableOpacity, Alert } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Vaults from '../pages/Vaults';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Collapsible from 'react-native-collapsible';
import NewVaultButton from './NewVaultButton';
import { useQueryClient } from 'react-query';
import { deleteVault } from '../helpers/Hooks';

const onPressVaultLabel = (navigation, vault) => {
    navigation.navigate('Vaults', {id: vault.id})
} 


const VaultDrawerlabel = ({vaults}) => {
    const [isCollapsed, setCollapsed] = React.useState(true);
    const navigation = useNavigation();
    const queryClient = useQueryClient();
    const userId = queryClient.getQueryData('getUser')._id;
    
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
                <TouchableOpacity onLongPress={() => {
                    // Create an alert to confirm deletion
                    Alert.alert(
                        "Delete Vault",
                        `Are you sure you want to delete "${vault.name}" vault?`,
                        [
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            { text: "OK", onPress: () => {
                                // Delete the vault
                                deleteVault(vault.id, userId)
                                .then((res) => {
                                    if (res.status === 200) {
                                        Alert.alert("Vault deleted Successfully");
                                        // Refetch the vaults
                                        queryClient.invalidateQueries('getVaults');
                                        queryClient.invalidateQueries('getUser');
                                        // 
                                    }
                                })
                                .catch((err) => {
                                    if (err.status === 400){
                                        Alert.alert(err.response.data.message);
                                    } else {
                                        Alert.alert("Error: Failed vault deletion");
                                    }
                                });
                            }
                            }
                        ],
                        { cancelable: false }
                    );
                }} onPress={() => {onPressVaultLabel(navigation, vault)}} style={{padding: 10}} key={index}>
                    <Text style={{color: 'white', fontSize: 15}}>{vault.name}</Text>
                </TouchableOpacity>
                );
            })}
                <View style={{flexDirection: "row", alignItems: 'center'}}>
                    <NewVaultButton/>
                </View> 
            </Collapsible>            
        </View>
    );
}

export default VaultDrawerlabel;