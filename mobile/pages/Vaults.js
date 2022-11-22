import { StyleSheet, Button, Text, View, Keyboard, ScrollView, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'left',
        justifyContent: 'top',
        paddingTop: 10
    },
});

const Vaults = ({ navigation }) => {
    return ( 
        <View style={styles.container}>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
                <Pressable
                    onPress={() => {
                             console.log("Merge sort");
                    }}
                    style={{
                        paddingLeft: 5,
                        alignItems: 'center'
                    }}
                >
                    {({ pressed }) => (
                        <MaterialCommunityIcons
                          name="plus-box"
                          size={35}
                          color={'#4681D0'}
                        />
                    )}
                </Pressable>
            </View>
            
            <ScrollView style={{flex: 1, marginTop: 10}}>
                <Text>Vaults</Text>
            </ScrollView>
        </View>
     );
}
 
export default Vaults;