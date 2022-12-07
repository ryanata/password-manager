
import React from 'react';

import { StyleSheet, Text, Button, View, Image, Pressable, TouchableOpacity, Alert } from 'react-native';

import { useState, useEffect } from 'react';
import axios from 'axios';

import MultiSlider from '@ptomasroos/react-native-multi-slider';
import * as Clipboard from 'expo-clipboard';
import DefaultMarker from '../components/DefaultMarker';
import Checkbox from 'expo-checkbox';
import {PasswordStrength} from "../components/StrengthMeter";
import { getGeneratePassword } from "../helpers/Hooks";

const PasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [refetch, setRefetch] = useState(false);
    const [length, setLength] = React.useState([10]);
    const lengthChange = values => setLength(values);
    const [numbers, setNumbers] = useState(false);
    const [symbols, setSymbols] = useState(false);
    const [uppercase, setUppercase] = useState(false);
    const [lowercase, setLowercase] = useState(true);
    const [alert, setAlert] = useState(false);

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(password);
        };

    useEffect(() => {
        console.log(length, lowercase, uppercase, numbers, symbols);
        axios
            .post("https://pwdly.herokuapp.com/api/generatePassword", { 
                length: length[0],
                numbers: numbers, 
                symbols: symbols,
                uppercase: uppercase,
                lowercase: lowercase 
            })
            .then((res) => {
                setPassword(res.data.password);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [lowercase, uppercase, numbers, symbols, length, refetch]);

    return (
        <View style={styles.container}>
            <View>
                <Text style={{fontSize: 30, marginBottom: 20}}>Password Generator</Text>
            </View>

            <View >
                <PasswordStrength password={password} />
            </View>

            <TouchableOpacity style={styles.passwordContainer} onPress={() => copyToClipboard()}> 
                    <Text style={{ color: '454545', fontSize: 22 }}>{password}</Text>
            </TouchableOpacity>

            <View style={[styles.customizePasswordContainer]}>
                <Text style={{fontSize: 25}}>Customize Password</Text>
            </View>

            <View style={[styles.checklistContainer]}>
                <View style={[styles.checkContainer]}>
                    <Checkbox 
                    color={lowercase ? '#4681D0' : '#B6B6B6'} 
                    style={styles.check} value={lowercase} 
                    onValueChange={(newValue) => setLowercase(newValue)}
                    />
                    <Text style={{fontSize: 20}}>Lowercase</Text>
                </View>

                <View style={[styles.checkContainer]}>
                    <Checkbox 
                    color={uppercase ? '#4681D0' : '#B6B6B6'} 
                    style={styles.check} value={uppercase} 
                    onValueChange={(newValue) => setUppercase(newValue)}
                    />
                    <Text style={{fontSize: 20}}>Uppercase</Text>
                </View>

                <View style={[styles.checkContainer]}>
                    <Checkbox 
                    color={numbers ? '#4681D0' : '#B6B6B6'} 
                    style={styles.check} value={numbers} 
                    onValueChange={(newValue) => setNumbers(newValue)}
                    />
                    <Text style={{fontSize: 20}}>Numbers</Text>
                </View>

                <View style={[styles.checkContainer]}>
                    <Checkbox 
                    color={symbols ? '#4681D0' : '#B6B6B6'} 
                    style={styles.check} value={symbols} 
                    onValueChange={(newValue) => setSymbols(newValue)}
                    />
                    <Text style={{fontSize: 20}}>Symbols</Text>
                </View>

                <Text style={{fontSize: 20, marginTop: 15}}>Password Length</Text>

                <View style={[styles.sliderContainer]}>
                    <TouchableOpacity style={[styles.sliderLength]}>
                        <Text style={{fontSize: 17}}>{length}</Text>
                    </TouchableOpacity>
                    <MultiSlider
                    values={length}
                    sliderLength={260}
                    onValuesChange={lengthChange}
                    min={8}
                    max={20}
                    step={1}
                    customMarker={DefaultMarker}
                    selectedStyle={{
                        backgroundColor: '#4681D0',
                        height: 10,
                        borderRadius: 50,
                    }}
                    unselectedStyle={{
                        height: 10,
                        borderRadius: 50,
                        backgroundColor: '#D9D9D9',
                    }}
                    />
                    </View>
                </View>       

            <TouchableOpacity style={styles.generatePasswordButton} onPress={() => setRefetch(!refetch)}>                                 
                    <Text style={{ color: 'white', fontSize: 17 }}>Generate Password</Text>
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
        width: "80%",
        marginBottom: 30,
        marginTop: 30,
    },
    customizePasswordContainer: {
        backgroundColor: '#F5F5F5',
        paddingLeft: 20,
        justifyContent: 'center',
        height: 65,
        width: "100%",
        borderWidth: 0.5,
        marginTop: 10, 
        paddingTop: 6,
        borderColor: '#E9E9E9',
        borderBottomColor: '#B8B8B8'
    },
    checklistContainer: {
        backgroundColor: '#F5F5F5',
        paddingLeft: 35,
        justifyContent: 'center',
        height: 325,
        width: "100%",
        borderWidth: 1,
        borderColor: '#E9E9E9',
    },
    sliderLength: {
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        width: "12%",
        height: 30,
        borderWidth: 1,
        borderColor: '#B6B6B6',
        borderRadius: 7.5,
        marginRight: 25,
        marginTop:8.5,
    },
    sliderContainer: {
        flexDirection: "row",
        marginTop: 5,
    },
    checkContainer: {
        flexDirection: "row",
        marginBottom: 15,
    },
    check: {
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        width: "7.5%",
        height: 30,
        borderWidth: 1,
        borderColor: '#B6B6B6',
        borderRadius: 7.5,
        marginRight: 20,
    },
    slider: {
        flexDirection: 'row',
    },
});

export default PasswordGenerator;
