import { 
    StyleSheet, 
    Button, 
    Text, 
    View,
    TouchableOpacity,
    Image,
    TextInput } 
from 'react-native';

import React, { Component, useReducer, useState } from 'react';
import axios from 'axios';
import {useForm, Controller} from 'react-hook-form'; 
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store';

const Register = () => {

    const [state, setState] = useState('')

    const navigation = useNavigation();

    const {setValue, handleSubmit, errors, control, getValues} = useForm({
        defaultValues:{
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            loggedIn: false
        }
    })

    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
    }

    const formHandler = (data) => {
        axios
            .post("https://pwdly.herokuapp.com/api/user/register",{
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                password: data.password,
            }).then((res) => {
                if (res.status === 201) {
                    // Redirect to dashboard
                    save("pwdlyToken", res.data.user.token)
                    .then(() => {
                        navigation.navigate('Dashboard');
                    });
                }
            }).catch((err) => {
                console.log(err)
                if (err.response.status === 400){
                    console.log("error")
                    setState({ alert: err.response.data.message});
                } else {
                    setState({ alert: "An error occured"});
                }
            })
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source = {require("../assets/logo.png")} />
                <View style={styles.inputView}>
                    <Controller
                        control= {control}
                        name="firstName"
                        render={({field: {onChange, value} }) =>(
                            <TextInput
                                required={true}
                                style={styles.TextInput}
                                placeholder="First Name"
                                autoCapitalize='none'
                                placeholderTextColor={"#003f5c"}
                                width = "100%"
                                textAlign='center'
                                onSubmitEditing={event =>
                                    this.passwordInput.wrappedInstance.focus()
                                }
                                onChangeText={value => onChange(value)}
                            />
                        )}
                    />
                </View>
                <View style={styles.inputView}>
                    <Controller
                        control= {control}
                        name="lastName"
                        render={({field: {onChange, value} }) =>(
                            <TextInput
                                required={true}
                                style={styles.TextInput}
                                placeholder="Last Name"
                                autoCapitalize='none'
                                placeholderTextColor={"#003f5c"}
                                width = "100%"
                                textAlign='center'
                                onChangeText={value => onChange(value)}
                            />
                        )}
                    />
                </View>
                <View style={styles.inputView}>
                    <Controller
                        control= {control}
                        name="email"
                        render={({field: {onChange, value} }) =>(
                            <TextInput
                                required={true}
                                style={styles.TextInput}
                                placeholder="Email"
                                autoCapitalize='none'
                                placeholderTextColor={"#003f5c"}
                                width = "100%"
                                textAlign='center'
                                onChangeText={value => onChange(value)}
                            />
                        )}
                    />
                    
                </View>
                <View style={styles.inputView}>
                    <Controller
                        control= {control}
                        name="phoneNumber"
                        render={({field: {onChange, value} }) =>(
                            <TextInput
                                required={true}
                                style={styles.TextInput}
                                placeholder="Phone Number"
                                autoCapitalize='none'
                                placeholderTextColor={"#003f5c"}
                                width = "100%"
                                textAlign='center'
                                onChangeText={value => onChange(value)}
                            />
                        )}
                    />
                </View>
                <View style={styles.inputView}>
                    <Controller
                        control= {control}
                        name="password"
                        render={({field: {onChange, value} }) =>(
                            <TextInput
                                required={true}
                                style={styles.TextInput}
                                placeholder="Password"
                                secureTextEntry={true}
                                autoCapitalize='none'
                                placeholderTextColor={"#003f5c"}
                                width = "100%"
                                textAlign='center'
                                onChangeText={value => onChange(value)}
                            />
                        )}
                    />
                </View>
                
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.Already_button}>Already have an account? Log in</Text>
            </TouchableOpacity>
            
            <Text style={styles.errorMessageTextStyle}>{state.alert}</Text>

            <TouchableOpacity style={styles.SignBtn} onPress = {handleSubmit(formHandler)}>
                <Text style={styles.loginText}>SIGN UP</Text>
            </TouchableOpacity>
        </View>
     );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4681D0',
        alignItems: 'center',
        justifyContent: 'center',
    },

    image :{
        marginBottom: 30,
        alignItems: "center",
        width: 110,
        height: 50,
        resizeMode: 'contain',
      },

    inputView: {
        backgroundColor: "#ffffff",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    
    SignBtn: {
        width: "50%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#ffffff",
    },
    errorMessageContainerStyle: {
        marginBottom: 8,
        backgroundColor: '#fee8e6',
        padding: 8,
        borderRadius: 4,
    },

    errorMessageTextStyle: {
        color: '#c62828',
        textAlign: 'center',
        fontSize: 20,
    },

    Already_button: {
        color: '#ffffff',
        height: 30,
        marginBottom: 30,
    },
});

export default Register;