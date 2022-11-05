import { 
    StyleSheet, 
    Button, 
    Text, 
    View, 
    TouchableOpacity, 
    Image, 
    TextInput
} from 'react-native';
import React, { Component, useState } from 'react';
import APIKit, {setClientToken} from '../APIKit';
//import axios from "axios";
//import { useForm } from "@mantine/form";

const initialState = {
    email: '',        // Store `username` when user enters their username
    password: '',        // Store `password` when user enters their password
    errors: {},          // Store error data from the backend here
    isAuthorized: false, // If auth is successful, set this to `true`
    isLoading: false,    // Set this to `true` if You want to show spinner
};

class Login extends Component {
    
    state = initialState;

    componentWillUnmount() {}
    
    onEmailChange = email => {
        this.setState({email});
    };

    onPasswordChange = email => {
        this.setState({password});
    };
    
    onPressLogin(){
        const {email, password} = this.state;
        const payload = {email, password};
        
        const onSuccess = ({data}) => {
            // Set JSON Web Token on success
            setClientToken(data.token);
            this.setState({isLoading: false, isAuthorized: true});
        };
    
        const onFailure = error => {
            console.log(error && error.response);
            this.setState({errors: error.response.data, isLoading: false});
        };
    
        // Show spinner when call is made
        this.setState({isLoading: true});
    
        APIKit.post('/api-token-auth/', payload)
        .then(onSuccess)
        .catch(onFailure);
    }
    getNonFieldErrorMessage() {
        // Return errors that are served in `non_field_errors`
        let message = null;
        const {errors} = this.state;
        if (errors.non_field_errors) {
          message = (
            <View style={styles.errorMessageContainerStyle}>
              {errors.non_field_errors.map(item => (
                <Text style={styles.errorMessageTextStyle} key={item}>
                  {item}
                </Text>
              ))}
            </View>
          );
        }
        return message;
    }
    
    getErrorMessageByField(field) {
        // Checks for error message in specified field
        // Shows error message from backend
        let message = null;
        if (this.state.errors[field]) {
            message = (
            <View style={styles.errorMessageContainerStyle}>
                {this.state.errors[field].map(item => (
                <Text style={styles.errorMessageTextStyle} key={item}>
                    {item}
                </Text>
                ))}
            </View>
            );
        }
        return message;
    }

    render() {
        const{isLoading} = this.state;
        return (
            <View style={styles.container}>
                <Image style={styles.image} source = {require("../assets/logo.png")} />

                    <View style={styles.inputView}>
                        <TextInput
                            required={true}
                            value={this.state.email}
                            style={styles.TextInput}
                            placeholder="Email"
                            placeholderTextColor="#003f5c"
                            onSubmitEditing={event =>
                                this.passwordInput.wrappedInstance.focus()
                            }
                            onChangeText={this.onEmailChange}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Password"
                            placeholderTextColor="#003f5c"
                            secureTextEntry={true}
                            onChangeText={this.PasswordChange}
                        />
                    </View>

                    <TouchableOpacity>
                        <Text style={styles.forgot_button}>Forgot Password?</Text>
                    </TouchableOpacity>
            
                    <TouchableOpacity style={styles.loginBtn} onPress = {this.onPressLogin.bind(this)}> 
                        <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableOpacity>
            </View>
        );
    }
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

    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
     
    loginBtn: {
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

export default Login;

  