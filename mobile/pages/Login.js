import * as React from 'react';
import { 
    StyleSheet, 
    Button, 
    Text, 
    View, 
    TouchableOpacity, 
    Image, 
    TextInput,
} from 'react-native';

import {useForm, Controller} from 'react-hook-form';
import axios from "axios";
import { useReducer } from "react";
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
//import AsyncStorage from '@react-native-async-storage/async-storage';

    
const Login = ()  => { 

    const navigation = useNavigation();

    const {setValue, handleSubmit, errors, control} = useForm({
        defaultValues: {
            'email': '',
            'password': ''
        }
    });

    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
        navigation.navigate('Dashboard');
    }

    async function getValueFor(key) {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
          return result
        } else {
          alert('No values stored under that key.');
        }
    }

    const [state, setState] = useReducer((state, newState) => ({ ...state, ...newState }), {
        forgotPassword: false,
        alert: "",
    });

    const loggedIn = null;
    const onPressLogin = (data) => {
        console.log(data.email);
        console.log(data.password);
        
        axios
            .post("https://pwdly.herokuapp.com/api/user/login", {  
                email: data.email,
                password: data.password,
            })
            .then((res) => {
                if (res.status === 200) { 
                    save('pwdlytoken', res.data.user.token)
                    
                }
            })
            .catch((err) => {
                console.log("error", err)
                // If login failed
                if (err.status === 401) {
                    // Set alert message
                    console.log("error")
                    setState({ alert: err.response.data.message });
                } else {
                    // Set alert message
                    setState({ alert: "An error occured" });
                }
            })
    }
    const onPressSignup = () => {
        navigation.navigate('Signup')
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source = {require("../assets/logo.png")} />

                <View style={styles.inputView}>
                    <Controller
                        control = {control}
                        name = "email"
                        render = {({ field: {onChange, value} }) => (
                            <TextInput
                                required={true}
                                style={styles.TextInput}
                                placeholder="Email"
                                autoCapitalize='none'
                                placeholderTextColor="#003f5c"
                                width = "100%"
                                textAlign='center'
                                onSubmitEditing={event =>
                                    {}
                                }
                                onChangeText={value => onChange(value)}
                            />
                        )}
                    />
                </View>

                <View style={styles.inputView}>
                    <Controller
                        control={control}
                        name = "password"
                        render = {({field: {onChange, value} }) => (
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Password"
                                placeholderTextColor="#003f5c"
                                secureTextEntry={true}
                                width = "100%"
                                textAlign='center'
                                autoCapitalize='none'
                                onChangeText={value => onChange(value)}
                            />
                        )}
                    />
                </View>

                <TouchableOpacity style ={styles.forgot_button} onPress = {handleSubmit(onPressSignup)}>
                    <Text style = {styles.signUpText}>New user? Sign Up</Text>
                </TouchableOpacity>
        
                <TouchableOpacity style={styles.loginBtn} onPress = {handleSubmit(onPressLogin)}> 
                    <Text style={styles.loginText}>LOGIN</Text>
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

    signUpText :{
        color: '#ffffff'
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

    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
     
    loginBtn: {
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
        color: '#db2828',
        textAlign: 'center',
        fontSize: 12,
    },

});
 
export default Login;