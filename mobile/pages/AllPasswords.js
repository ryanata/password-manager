import { StyleSheet, Button, Text, View, Keyboard, ScrollView } from 'react-native';
import { useQuery } from 'react-query';
import VaultTable from '../components/VaultTable'
import VaultRow from '../components/VaultRow'
import { getMe, useVault, getVaults, getVaultData, getValueFor } from '../hooks/getAllVaultsQuery';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';

const getVaultInfo = () =>{
        
    const { data, isLoading, isError } = useQuery("getUser", () => getMe())

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (isError) {
        return <Text>Error: {isError.message}</Text>;
    }
    
    //console.log(data.vault)
    return data.vaults;
}

const AllPasswords = ({route}) => {
   
    //console.log(route.params.id)
    const id = route.params.id
    //const { data, isLoading, isError } = useQuery("getUser", () => getMe()
    let vaultId = getVaultInfo()
    //console.log(vaultId[0])

    const { data, isLoading, isError } = useQuery("getVault_${id}", () => useVault(id))

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (isError) {
        return <Text>Error: {isError.message}</Text>;
    }

    console.log(data.vault.sites)

    const sites = data.vault.sites
    return ( 
        <View style={styles.container}>
            <ScrollView style={{flex: 1, marginTop: 10}}>
                <Text>{data.vault.name}</Text>
            </ScrollView>
            {sites.map((site) => (<VaultRow site={site}/> ))}
        </View>
     );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'left',
        justifyContent: 'top',
        paddingTop: 10,
        alignItems: 'center'
    },
    text1:{

    }
});

export default AllPasswords;
