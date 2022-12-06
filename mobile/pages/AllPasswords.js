import { StyleSheet, SafeAreaView, Button, Text, View, Keyboard, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VaultTable from '../components/VaultTable'
import { useQueryClient } from 'react-query';

const AllPasswords = () => {
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData('getUser');
    const vaults = user.vaults;
    console.log(vaults);
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
