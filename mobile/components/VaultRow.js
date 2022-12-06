import React from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native';
import Avatar from './Avatar'
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const VaultRow = ({site, vaultId, stackable, first}) => {
    const navigation = useNavigation();

    const endNavigation = () => {
        navigation.navigate('SiteInfo', {site: site, vaultId:vaultId, fromAllPasswords: stackable});
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
            <TouchableOpacity style={{
                flex: 1,
                alignItems: 'center'
            }} onPress={endNavigation}>
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