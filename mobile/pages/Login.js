import { 
    StyleSheet, 
    Button, 
    Text, 
    View, 
    TouchableOpacity, 
    Image, 
    TextInput
} from 'react-native';

import { useForm } from "@mantine/form";
import axios from "axios";
import {SecureStore} from 'expo';


console.log("1");
const Login = (values) => {
    const form = useForm({
        initialValues: {
            email: "",
            password: "",
            remember: false,
            submittingLogin: null,
            loggedIn: null,
        },
        validate: {
            email: (value) => !value.includes("@") && "Invalid email",
        },
    });
    
    console.log("4");
    
    //const {email, password} = this.state;
    const onPressLogin = () => {
        //const {email, password} = this.state;
        //const payload = {email, password};
        console.log("5")
        axios
            .post("/api/user/login", {
                email: values.email,
                password: values.password,
            })
            .then((res) => {
                // If login successful
                if (res.status === 200) {
                    // Redirect to dashboard
                    iiSecureStore.setItemAsync('pwdlyToken', res.data.user.token);
                    //localStorage.setItem("pwdlyToken", JSON.stringify(res.data.user.token));
                    form.setFieldValue("loggedIn", true);
                }
            })
            .catch((err) => {
                // If login failed
                if (err.response.status === 401) {
                    // Set alert message
                    setState({ alert: err.response.data.message });
                } else {
                    // Set alert message
                    setState({ alert: "An error occured" });
                }
            })
            console.log("6")
    }
    
    
    return (
        <View style={styles.container}>
            <Image style={styles.image} source = {require("../assets/logo.png")} />

                <View style={styles.inputView}>
                    <TextInput
                        required={true}
                        value={form.values.email}
                        style={styles.TextInput}
                        placeholder="Email"
                        autoCapitalize='none'
                        placeholderTextColor="#003f5c"
                        onSubmitEditing={event =>
                            this.passwordInput.wrappedInstance.focus()
                        }
                        onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        value = {form.values.password}
                        placeholder="Password"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        autoCapitalize='none'
                        onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
                        error={form.errors.password && "Invalid password"}
                    />
                </View>

                <TouchableOpacity>
                    <Text style={styles.forgot_button}>Forgot Password?</Text>
                </TouchableOpacity>
        
                <TouchableOpacity style={styles.loginBtn} onPress = {onPressLogin(form.values)}> 
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

  

  
