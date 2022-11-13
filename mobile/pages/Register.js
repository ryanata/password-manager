import { 
    StyleSheet, 
    Button, 
    Text, 
    View,
    TouchableOpacity,
    Image,
    TextInput } 
from 'react-native';

import React, { Component, useState } from 'react';
import axios from 'axios';
import {useForm, Controller} from 'react-hook-form'; 

const Register = () => {

    const {setValue, handleSubmit, errors, control} = useForm({
        defaultValues:{
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: ''
        }
    })

    const formHandler = (data) => {
        console.log(data.firstName);
        console.log(data.lastName);
        console.log(data.email);
        console.log(data.phoneNumber);
        console.log(data.password);
        axios
            .post("https://pwdly.herokuapp.com/api/user/register",{
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                password: data.password,
            }).then((res) => {
                
            }).catch((err) => {
                console.log("error", err)
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
                                placeholder="First name"
                                autoCapitalize='none'
                                placeholderTextColor={"#003f5c"}
                                onSubmitEditing={event =>
                                    this.passwordInput.wrappedInstance.focus()
                                }
                                onChangeText={value => onChange(value)}
                            />
                        )}
                    />
                    
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        required={true}
                        //value={this.state.email}
                        style={styles.TextInput}
                        placeholder="Last name"
                        placeholderTextColor={"#003f5c"}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        required={true}
                        //value={this.state.email}
                        style={styles.TextInput}
                        placeholder="Email"
                        placeholderTextColor={"#003f5c"}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        required={true}
                        //value={this.state.email}
                        style={styles.TextInput}
                        placeholder="Phone Number"
                        placeholderTextColor={"#003f5c"}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        required={true}
                        //value={this.state.email}
                        style={styles.TextInput}
                        placeholder="Password"
                        placeholderTextColor={"#003f5c"}
                    />
                </View>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.Already_button}>Already have an account? Log in</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.SignBtn} onPress = {handleSubmit(formHandler)}>
                <Text style={styles.loginText}>Sign Up</Text>
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
        marginBottom: 40,
        alignItems: "center",
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
        width: "80%",
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
        color: '#db2828',
        textAlign: 'center',
        fontSize: 12,
    },

    Already_button: {
        height: 30,
        marginBottom: 30,
    },
});

export default Register;