import { StyleSheet, Button, Text, View, Keyboard, ScrollView } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";

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
            <SearchBar
                placeholder="Search here"
                onPress={() => {Keyboard.dismiss()}}
                onChangeText={(text) => console.log(text)}
                
            />
            <ScrollView style={{flex: 1, marginTop: 10}}>
                <Text>Yessir</Text>
                <Text>Sheesh</Text>
            </ScrollView>
        </View>
     );
}
 
export default AllPasswords;