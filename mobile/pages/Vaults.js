import * as React from 'react';
import { StyleSheet, Button, Text, View, Keyboard, ScrollView, Pressable } from 'react-native';
import CustomSearchbar from '../components/SearchBar';
import VaultTable from '../components/VaultTable';
import AddAccount from '../components/AddAccount';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff',
        justifyContent: 'top',
        paddingTop: 10,
    },
});

 

const Vaults = ({ route }) => {
    const id = route.params?.id;

    const [search, setSearch] = React.useState("");
    if (!id) {
        return <Text>Error</Text>
    }

    return ( 
        <View style={styles.container}>
            
            
            <View style={{flexDirection: "row", flex: 0.7}}>
                <CustomSearchbar setSearch={setSearch}/>
                <AddAccount vaultId={id} />
            </View>
            <View style={{flex: 10}}>
                <VaultTable vault={route.params.vault} searchTerm={search} id={id}/>
            </View>
            
        </View>
     );
}
 
export default Vaults;