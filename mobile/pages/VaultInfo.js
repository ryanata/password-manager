import {StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native';
//import Avatar from './Avatar';

const VaultInfo = ({route}) => {

    const site = route.params.site;

    console.log(site)
    const accounts = site.accounts
    //console.log(site.accounts)
    return(
        <View style={styles.container}>

            <Text>{site.name}</Text>
            <Text>{site.url}</Text>
            {accounts.map((account, index) => ( 
                <View>
                    <Text>Username: {account.username} </Text>
                    <Text>Password: {account.password}</Text>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
});

export default VaultInfo;