
import { StyleSheet, SafeAreaView, Button, FlatList, Text, View, Keyboard, ScrollView, StatusBar } from 'react-native';
import { useQuery } from 'react-query';
import VaultRow from '../components/VaultRow'
import { useVault } from '../hooks/getAllVaultsQuery';


const VaultTable = ({id, stackable}) => {
    const { data, isLoading, isError } = useQuery(`getVault_${id}`, () => useVault(id))

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (isError) {
        return <Text>Error: {isError.message}</Text>;
    }

    const sites = data.vault.sites
    const fakeSites = [
        {
            "_id": 1,
            "name": "Google",
            "url": "https://www.google.com",
            accounts: []
        },
        {
            "_id": 2,
            "name": "Facebook",
            "url": "https://www.facebook.com",
            accounts: []
        },
        {
            "_id": 3,
            "name": "Twitter",
            "url": "https://www.twitter.com",
            accounts: []
        },
        {
            "_id": 4,
            "name": "Instagram",
            "url": "https://www.instagram.com",
            accounts: []
        },
        {
            "_id": 5,
            "name": "Reddit",
            "url": "https://www.reddit.com",
            accounts: []
        },
        {
            "_id": 6,
            "name": "Github",
            "url": "https://www.github.com",
            accounts: []
        },
        {
            "_id": 7,
            "name": "Amazon",
            "url": "https://www.amazon.com",
            accounts: []
        },
        {
            "_id": 8,
            "name": "Netflix",
            "url": "https://www.netflix.com",
            accounts: []
        },
    ];

    if (stackable) {
        return (
            <View>
                <Text style={{fontSize: 15, fontWeight: "bold"}}>{data.vault.name}</Text>
                {sites.map((site, index) => (<VaultRow key={index} site={site} vaultId={id}/> ))}
            </View>
        )
    }

    return ( 
        <SafeAreaView style={styles.container}>
            <FlatList
                data={fakeSites}
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
        backgroundColor: 'blue',
    },
});

export default VaultTable;

 