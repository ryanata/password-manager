import { StyleSheet, Button, Text, View, Keyboard, ScrollView } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'left',
        justifyContent: 'top',
        paddingTop: 10
    },
});
const AllPasswords = ({ navigation }) => {
    return ( 
        <View style={styles.container}>
            <ScrollView style={{flex: 1, marginTop: 10}}>
                <Text>Passwords</Text>
            </ScrollView>
        </View>
     );
}
 
export default AllPasswords;
