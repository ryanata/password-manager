import React from 'react';
import {StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity} from 'react-native';
import Avatar from './Avatar'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { deleteSite } from '../helpers/Hooks';
import { useQueryClient } from 'react-query';

const VaultRow = ({site, vaultId, stackable, first}) => {
    const navigation = useNavigation();
    const queryClient = useQueryClient();

    const endNavigation = () => {
        navigation.navigate('SiteInfo', {site: site, vaultId:vaultId, fromAllPasswords: stackable});
    }

    const deleteRow = () => {
        // Create an alert to confirm deletion
        Alert.alert(
            "Delete site",
            `Are you sure you want to delete "${site.name}"?`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => {
                    // Delete the vault
                    deleteSite(vaultId, site._id)
                    .then((res) => {
                        if (res.status === 200) {
                            // Refetch the sites
                            queryClient.invalidateQueries(`getVault_${vaultId}`);
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
    }

    const styles = StyleSheet.create({
        container:{
            height: 80,
            borderBottomColor: '#B8B8B8',
            borderBottomWidth: 0.9,
            paddingLeft: 10,
            paddingRight: 10,
            borderTopWidth: (first && stackable) ? 0.9 : 0,
            borderTopColor: (first && stackable) ? '#B8B8B8' : 'transparent',
        },
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={{
                    flex: 1,
                    alignItems: 'center'
                }} 
                onPress={endNavigation}
                onLongPress={deleteRow}
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Avatar site={site.url} style={{marginLeft: 20}}></Avatar>
                        <Text style={{fontSize: 23, paddingLeft: 20}}>{site.name}</Text>
                    </View>
                    <Image source={require('../assets/right-chevron.png')} style={{ width: 22, height: 18 }} />
                </View>
            </TouchableOpacity>
        </View>
    )
}



export default VaultRow;