import { StyleSheet, Text, Button, View, Image, Pressable, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

const PasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [refetch, setRefetch] = useState(false);
    const [settings, setSettings] = useState({
        length: 10,
        lowercase: true,
        uppercase: false,
        numbers: false,
        symbols: false
    });

    useEffect(() => {
        axios
            .post("https://pwdly.herokuapp.com/api/generatePassword", { 
                length: settings.length,
                numbers: settings.numbers, 
                symbols: settings.symbols,
                uppercase: settings.uppercase,
                lowercase: settings.lowercase 
            })
            .then((res) => {
                setPassword(res.data.password);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [settings, refetch]);

    return (
        <View style={styles.container}>
            <Text>{password}</Text>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default PasswordGenerator;