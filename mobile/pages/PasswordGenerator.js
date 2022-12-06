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
            <View>
                <Text style={{fontSize: 30, marginBottom: 20}}>Password Generator</Text>
            </View>

            <View>
                <Text style={{fontSize: 22}}>------ ------ ------ ------</Text>
            </View>

            <TouchableOpacity style={styles.passwordContainer}> 
                    <Text style={{ color: '454545', fontSize: 22 }}>{password}</Text>
            </TouchableOpacity>

            <View style={[styles.customizePasswordContainer]}>
                <Text style={{fontSize: 25}}>Customize Password</Text>
            </View>
            <View style={[styles.checklistContainer]}>
                <Text style={{fontSize: 25}}>*Checklists*</Text>
            </View>

            <TouchableOpacity style={styles.generatePasswordButton}> 
                    <Text style={{ color: 'white' }}>Generate Password</Text>
            </TouchableOpacity>
            
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
    generatePasswordButton: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        backgroundColor: "#4681D0",
        marginBottom: 80,
    },
    passwordContainer: {
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderWidth: 1,
        borderRadius: 7.5,
        borderColor: '#E9E9E9',
        width: "60%",
        marginBottom: 30,
        marginTop: 30,
    },
    customizePasswordContainer: {
        backgroundColor: '#F5F5F5',
        paddingLeft: 20,
        justifyContent: 'center',
        height: 65,
        width: "100%",
        borderWidth: 1,
        marginTop: 10, 
        paddingTop: 6,
        borderColor: '#E9E9E9',
        borderBottomColor: '#B8B8B8'
    },
    checklistContainer: {
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: "100%",
        borderWidth: 1,
        borderColor: '#E9E9E9',
    }
});

export default PasswordGenerator;