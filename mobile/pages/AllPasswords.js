import { StyleSheet, Button, Text, View, Keyboard, ScrollView } from 'react-native';
import { useQuery } from 'react-query';
import VaultTable from '../components/VaultTable'
import VaultRow from '../components/VaultRow'
import { getMe, useVault, getVaults, getVaultData, getValueFor } from '../hooks/getAllVaultsQuery';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';

const AllPasswords = ({route}) => {
    //console.log(route.params.id)
    const vaults = route.params.id
    
    //console.log(vaults);

    return ( 
        <View style={styles.container}>
            {/*<ScrollView style={{flex: 1, marginTop: 10}}>
                <Text>{data.vault.name}</Text>
            </ScrollView>
            {sites.map((site) => (<VaultRow site={site}/> ))}*/}
            {vaults.map((vault, index) => (<VaultTable key={index} id={vault}/> ))}
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    text1:{

    }
});

export default AllPasswords;
