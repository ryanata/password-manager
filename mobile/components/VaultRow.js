import React from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native';
import Avatar from './Avatar'
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const VaultRow = ({site, vaultId, stackable}) => {
    const navigation = useNavigation();

    const endNavigation = () => {
        navigation.navigate('SiteInfo', {site: site, vaultId:vaultId, fromAllPasswords: stackable});
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{
                flex: 1,
                backgroundColor: '#ffffff',
                alignItems: 'center'
            }} onPress={endNavigation}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Avatar site={site.url}></Avatar>
                        <Text style={{fontSize: 25, paddingLeft: 10}}>{site.name}</Text>
                    </View>
                    <Image source={require('../assets/right-chevron.png')} style={{ width: 22, height: 22 }} />
                </View>
            </TouchableOpacity>
        </View>
    )
}




const styles = StyleSheet.create({
    container:{
        height: 100,
        borderBottomColor: '#B8B8B8',
        borderBottomWidth: 0.7,
        borderTopWidth: 0.7,
        paddingLeft: 10,
        paddingTop: 10,
        paddingRight: 10,
    },
    row: {
        
    },
});

export default VaultRow;