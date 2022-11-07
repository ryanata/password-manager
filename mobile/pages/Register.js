import { 
    StyleSheet, 
    Button, 
    Text, 
    View,
    Image,
    TextInput } 
from 'react-native';

import React, { Component, useState } from 'react';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

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
 
export default Register;