import { useState } from 'react';
import { ActivityIndicator, StyleSheet, SafeAreaView, Button, FlatList, Text, View, Keyboard, ScrollView, StatusBar } from 'react-native';
import { useQuery } from 'react-query';
import VaultRow from '../components/VaultRow'
import { useVault } from '../hooks/getAllVaultsQuery';
import { useDebounce, useVaultSearch } from '../helpers/Hooks';

const VaultTable = ({searchTerm, id, stackable}) => {
    const { data, isLoading, isError } = useQuery(`getVault_${id}`, () => useVault(id))
    // Get vault search data
    const searchTermDebounced = useDebounce(searchTerm, 500);
    const { data: searchData, isLoading: searchLoading, error: searchError } = useVaultSearch(id, searchTermDebounced);
    if(isLoading || searchLoading){
        return <ActivityIndicator />
    }
    if(isError || searchError){
        return <Text>Errorr</Text>
    }
    
    const vault = searchData
        ? {
              ...data.vault,
              sites: searchData.sites,
          }
        : data.vault;
    const sites = vault.sites


    if (stackable) {
        return (
            <View>
                <Text style={{
                    fontSize: 17, 
                    paddingLeft: 16, 
                    paddingVertical: 2,
                    backgroundColor:"#F2F2F2",
                    fontWeight: "500",
                    borderBottomWidth: 0.9,
                    borderBottomColor: '#B8B8B8',
                    
                }}>{data.vault.name}</Text>
                {sites.map((site, index) => (<VaultRow key={index} site={site} vaultId={id} stackable first={index===0}/> ))}
            </View>
        )
    }
    
    return ( 
        <SafeAreaView style={styles.container}>
            <Text style={{
                    fontSize: 17, 
                    paddingLeft: 16, 
                    paddingVertical: 2,
                    backgroundColor:"#F2F2F2",
                    fontWeight: "500",
                    borderBottomWidth: 0.9,
                    borderBottomColor: '#B8B8B8',
                    
                }}>{vault.name}</Text>
            <FlatList
                data={sites}
                renderItem={({ item }) => <VaultRow site={item} vaultId={id}/>}
                keyExtractor={item => item._id}
            />
            {/* {sites.map((site, index) => (<VaultRow site={site} key={site._id} lastElement={index === sites.length - 1}/> ))} */}
        </SafeAreaView>
     );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        marginTop: StatusBar.currentHeight || 0,
    },
});

export default VaultTable;
 

