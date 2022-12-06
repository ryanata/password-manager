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
        paddingTop: 10,
    },
});

 

const Vaults = ({ route, navigation }) => {
    const id = route.params?.id;

    const [search, setSearch] = React.useState("");
    if (!id) {
        return <Text>Error</Text>
    }

    return ( 
        <View style={styles.container}>
            <CustomSearchbar setSearch={setSearch}/>
            <VaultTable vault={route.params.vault} searchTerm={search} id={id}/>
        </View>
     );
}
 
export default Vaults;