import { StyleSheet, SafeAreaView, Button, Text, View, Keyboard, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VaultTable from '../components/VaultTable'
import { useQuery } from 'react-query';
import { getMe } from '../hooks/getAllVaultsQuery';

const AllPasswords = () => {
    const { data, isLoading, isError } = useQuery("getUser", () => getMe())
    const vaults = data.vaults;

    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
            <SafeAreaView style={styles.container}>
                {vaults.map((vault, index) => (<VaultTable stackable searchTerm="" key={index} id={vault} lastElement={index === vaults.length - 1}/> ))}
            </SafeAreaView>
        </ScrollView>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});

export default AllPasswords;
