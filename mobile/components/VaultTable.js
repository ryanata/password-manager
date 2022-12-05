
import { StyleSheet, Button, Text, View, Keyboard, ScrollView } from 'react-native';
import { useQuery } from 'react-query';
import VaultRow from '../components/VaultRow'
import { getMe, useVault, getVaults, getVaultData, getValueFor } from '../hooks/getAllVaultsQuery';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';


const VaultTable = ({id}) => {

    const { data, isLoading, isError } = useQuery(`getVault_${id}`, () => useVault(id))

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (isError) {
        return <Text>Error: {isError.message}</Text>;
    }

    const sites = data.vault.sites
    console.log(data)

    return ( 
        <View style={styles.container}>
            <ScrollView style={{flex: 1, marginTop: 10}}>
                <Text>{data.vault.name}</Text>
            </ScrollView>
            {sites.map((site, index) => (<VaultRow key={index} site={site}/> ))}
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

export default VaultTable;

 