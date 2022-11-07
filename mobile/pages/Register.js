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

const Register = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source = {require("../assets/logo.png")} />
                <View style={styles.inputView}>
                    <TextInput
                        required={true}
                        //value={this.state.email}
                        style={styles.TextInput}
                        placeholder="First name"
                        placeholderTextColor={"#003f5c"}
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
                        placeholder="Password"
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

            <TouchableOpacity style={styles.SignBtn}>
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