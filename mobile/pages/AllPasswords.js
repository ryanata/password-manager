import * as React from 'react';
import { StyleSheet, SafeAreaView, Button, Text, View, Keyboard, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VaultTable from '../components/VaultTable'
import { useQueryClient } from 'react-query';
import CustomSearchbar from '../components/SearchBar';

const AllPasswords = () => {
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData('getUser');
    const vaults = user.vaults;
    const [search, setSearch] = React.useState("");
    return (
        <View style={{ flex: 1}}>
            <View style={{flex: 0.08}}>
                <CustomSearchbar setSearch={setSearch}/>
            </View>
            
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{flex: 2}}>
                <SafeAreaView style={styles.container}>
                    {vaults.map((vault, index) => (<VaultTable stackable searchTerm={search} key={index} id={vault} lastElement={index === vaults.length - 1}/> ))}
                </SafeAreaView>
            </ScrollView>
        </View>
        
    );
}
 
const styles = StyleSheet.create({
    container: {
        
        backgroundColor: '#ffffff',
    },
});

export default AllPasswords;
