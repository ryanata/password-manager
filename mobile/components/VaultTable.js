import * as React from 'react';
import { StyleSheet, Button, Text, View, Keyboard, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";
import { useVault, useVaultSearch } from '../helpers/Hooks';
import CustomSearchbar from '../components/SearchBar';
import { getUserId, useDebounce } from '../helpers/Hooks';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'left',
        justifyContent: 'top',
        paddingTop: 10
    },
});

 

const VaultTable = ({ searchTerm, vaultId }) => {
    // Get vault data
    const { data, isLoading, isError, error } = useVault(vaultId);
    // Get vault search data
    const [search, setSearch] = React.useState("");
    const searchTermDebounced = useDebounce(searchTerm, 500);
    const { data: searchData, isLoading: searchLoading, error: searchError } = useVaultSearch(vaultId, searchTermDebounced);

    if(isLoading || searchLoading){
        return <ActivityIndicator />
    }
    if(isError){
        Alert("Error: placeholder")
        return <Text>Errorr</Text>
    } 

    const vault = searchData
        ? {
              ...data.vault,
              sites: searchData.sites,
          }
        : data.vault;
    const sites = data.vault.sites
    

    return ( 
        
        <ScrollView style={{flex: 1, marginTop: 10}}>
            {vault?.sites?.map((site, index) => {
                return (
                    //need to replace with proper vault row
                    <Text style={{color: 'black', fontSize: 15, marginTop: 10}} key={index}>{site.name}</Text>
                );
            })}
        </ScrollView>
        
     );
}
 
export default VaultTable;