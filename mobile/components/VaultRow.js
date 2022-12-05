import React from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native';
import Avatar from './Avatar'
import { NavigationContainer, useNavigation } from '@react-navigation/native';


const VaultRow = ({site}) => {
    const navigation = useNavigation();
    
    //console.log(site.accounts)

    return (
        <View style={styles.container}>

            {/*change to view if whole row is not intended to be a button*/}
            <TouchableOpacity style={styles.row} onPress={() => {navigation.navigate('VaultInfo', {site : site})}}>
                <Text style={styles.websiteUrl}>{site.name}</Text>
                <Avatar site={site.url} style={styles.avatar}></Avatar>
                <Image style={{ right: 10, position: 'absolute'}} source = {require('../assets/chevron-right-solid-24.png')} />
            </TouchableOpacity> 
            
        </View>
    )
}




const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: "column",
        alignItems: 'flex-start',
        //height: 50,
        borderBottomColor: '#B8B8B8',
        borderBottomWidth: 0.7,
        borderTopWidth: 0.7,
        borderTopColor: '#B8B8B8',
        height: 100,
    },
    row: {
        backgroundColor: '#ffffff',
        //flex: 1,
        alignItems:'center',
        //borderBottomColor: '#B8B8B8',
        //borderBottomWidth: 0.7,
        //borderTopWidth: 0.7,
        //borderTopColor: '#B8B8B8',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        //alignSelf: 'flex-start',
    },
    websiteUrl:{
        fontSize: 25,
        position: 'absolute',
    },
    avatar:
    {
        //alighnItems: 'left',
        position: 'absolute',
    },
});

export default VaultRow;