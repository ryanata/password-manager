import * as React from 'react';
import { StyleSheet, Button, Text, View, Keyboard, ScrollView, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";
import { useVault, useVaultSearch, getUserId, useDebounce } from '../helpers/Hooks';
import CustomSearchbar from '../components/SearchBar';
import VaultTable from '../components/VaultTable';
import AddAccount from '../components/AddAccount';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff',
        alignItems: 'left',
        justifyContent: 'top',
        paddingTop: 10
    },
});

 

const Vaults = ({ route, navigation }) => {
    const id = route.params.vault.id;

    const [search, setSearch] = React.useState("");
    //for rerendering component. dosent work
    const [_, forceUpdate] = React.useReducer((x) => x + 1, 0);

    function handleClick() {
        console.log('updated')
        forceUpdate();
    }
    

    return ( 
        <View style={styles.container}>
            <View style={{flexDirection: "row", flex: 0.7}}>
                <CustomSearchbar setSearch={setSearch}/>
                <AddAccount vaultId={id} rerenderVaults={handleClick}/>
            </View>
            <View style={{flex: 10}}>
                <VaultTable vault={route.params.vault} searchTerm={search} vaultId={id}/>
            </View>
            <Button onPress={handleClick} title="rerender">Force update</Button>
                
        </View>
     );
}
 
export default Vaults;