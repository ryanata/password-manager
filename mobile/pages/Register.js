import { 
    StyleSheet, 
    Button, 
    Text, 
    View,
    Image,
    TextInput } 
from 'react-native';

import React, { Component, useState } from 'react';

const Register = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Register</Text>
            <Button
                title="Already have an account? Log in"
                onPress={() => navigation.navigate('Login')}
            />
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
});

export default Register;