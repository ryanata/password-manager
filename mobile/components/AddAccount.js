import { useState } from "react";
import * as React from 'react'
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, TouchableOpacity } from "react-native";
import axios from 'axios';
import {useForm, Controller} from 'react-hook-form';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const AddAccount = ({rerenderVaults, vaultId}) => {
    const navigation = useNavigation();
	const [state, setState] = useState('')
	const [modalVisible, setModalVisible] = useState(false);
	const {setValue, handleSubmit, formState: {errors, isValid}, control} = useForm({
		defaultValues:{
			name: '',
            username: '',
            password: '',
            url: '',
            tags: ''
		}
	})
    
    const formHandler = (values) => {
        const selectedTags = values.tags;

        if (values.url.length > 6 && !values.name && values.url.includes('.')) {
            // if www. is in the url, set the name to the url without www.
            if (values.url.includes('www.')) {
                const noWWW = values.url.split('www.')[1];
                // set the name to noWWW without the everything after the last period and capitalize the first letter
                values.name = noWWW.split('.')[0].charAt(0).toUpperCase() + noWWW.split('.')[0].slice(1);
                //setFieldValue('name', noWWW.split('.')[0].charAt(0).toUpperCase() + noWWW.split('.')[0].slice(1));
            } else if (values.url.includes('https://')) {
                const noHTTPS = values.url.split('https://')[1];
                values.name = noHTTPS.split('.')[0].charAt(0).toUpperCase() + noHTTPS.split('.')[0].slice(1)
                //setFieldValue('name', noHTTPS.split('.')[0].charAt(0).toUpperCase() + noHTTPS.split('.')[0].slice(1));
            } else {
                values.name = values.url.split('.')[0].charAt(0).toUpperCase() + values.url.split('.')[0].slice(1)
                //setFieldValue('name', values.url.split('.')[0].charAt(0).toUpperCase() + values.url.split('.')[0].slice(1));
            }
        }

        //check if fields are empty
        if(values.url.trim().length === 0 || 
        values.username.trim().length === 0 || 
        values.password.trim().length === 0 ||
        values.name.trim().length === 0){
            Alert.alert("Fill out all fields");
            setModalVisible(!modalVisible)
            return
        }
        
        axios.post(`https://pwdly.herokuapp.com/api/vault/${vaultId}/site/account`, {
            name: values.name,
            url: values.url,
            username: values.username,
            password: values.password,
            tags: selectedTags,
        }).then((res) => {
            Alert.alert("Account added")
            //navigation.navigate('Vaults', {id: vaultId})
        }).catch((err) => {
            Alert.alert("Account creation failed:\n" + err)
            console.log(err)
        });
        setModalVisible(false);
    };
return(
    <View style={styles.centeredView}>
        <Modal
		animationType="fade"
		transparent={true}
		visible={modalVisible}
		onRequestClose={() => {
		Alert.alert("Modal has been closed.");
		setModalVisible(!modalVisible);
		}}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.modalHeader}>
                    <View style={styles.modalHeaderContent}><Text></Text></View>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                    <MaterialCommunityIcons
                        name="close"
                        size={25}
                        color={'#000000'}
                    />
                    </TouchableOpacity>
                </View>
                <Controller
                  control= {control}
                  name="name"
                  render={({field: {onChange, value} }) =>(
                      	<TextInput
						required={true}
						style={styles.TextInput}
						placeholder="Enter Account name"
						autoCapitalize='none'
						placeholderTextColor={"#003f5c"}
						onSubmitEditing={event =>
						{}
						}
						onChangeText={value => onChange(value)}
                      	/>
                  )}
                  rules={{
                    minLength: {
                      value: 1,
                      message: 'field is empty' // JS only: <p>error message</p> TS only support string
                    }
                  }}
                />
                <Controller
                control= {control}
                name="url"
                render={({field: {onChange, value} }) =>(
					<TextInput
					required={true}
					style={styles.TextInput}
					placeholder="URL"
					autoCapitalize='none'
					placeholderTextColor={"#003f5c"}
					onSubmitEditing={event =>
						{}
					}
					onChangeText={value => onChange(value)}
					/>
                )}
                rules={{
					minLength: {
						value: 1,
						message: 'field is empty' // JS only: <p>error message</p> TS only support string
					}
                }}
                />     
                <Controller
                  control= {control}
                  name="username"
                  render={({field: {onChange, value} }) =>(
                      	<TextInput
						required={true}
                        textContentType='username'
						style={styles.TextInput}
						placeholder="Enter Username"
						autoCapitalize='none'
						placeholderTextColor={"#003f5c"}
						onSubmitEditing={event =>
						{}
						}
						onChangeText={value => onChange(value)}
                      	/>
                  )}
                  rules={{
                    minLength: {
                      value: 1,
                      message: 'field is empty' // JS only: <p>error message</p> TS only support string
                    }
                  }}
                />
                <Controller
                  control= {control}
                  name="password"
                  render={({field: {onChange, value} }) =>(
                      	<TextInput
						required={true}
                        secureTextEntry={true}
                        textContentType='password'
						style={styles.TextInput}
						placeholder="Enter Password"
						autoCapitalize='none'
						placeholderTextColor={"#003f5c"}
						onSubmitEditing={event =>
						{}
						}
						onChangeText={value => onChange(value)}
                      	/>
                  )}
                  rules={{
                    minLength: {
                      value: 1,
                      message: 'field is empty' // JS only: <p>error message</p> TS only support string
                    }
                  }}
                />
                <Controller
                  control= {control}
                  name="tags"
                  render={({field: {onChange, value} }) =>(
                      	<TextInput
						required={true}
						style={styles.TextInput}
						placeholder="Enter Tags"
						autoCapitalize='none'
						placeholderTextColor={"#003f5c"}
						onSubmitEditing={event =>
						{}
						}
						onChangeText={value => onChange(value)}
                      	/>
                  )}
                  rules={{
                    minLength: {
                      value: 1,
                      message: 'field is empty' // JS only: <p>error message</p> TS only support string
                    }
                  }}
                />
                <Pressable
                style={({pressed}) => [styles.button, styles.buttonClose,{backgroundColor: pressed ? "#16578B" : "#2196F3"}]}
                onPress={handleSubmit(formHandler)}
                >
                  <Text style={styles.textStyle}>Add Account</Text>
                </Pressable>

              </View>
            </View>
        </Modal>

        <Pressable
        onPress={() => {
          	setModalVisible(true)
        }}
        style={({ pressed }) => [{borderRadius: 10 },{backgroundColor: pressed ? "#16578B" : "white"}]}
        >
			{({ pressed }) => (
                <MaterialCommunityIcons
				name="plus-box"
				size={35}
				color={'#4681D0'}
				/>
			)}
        </Pressable>
    </View>
);
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 10,
      padding: 5,
      elevation: 2,
      
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    TextInput: {
        padding: 10,
        width: "100%",
        textAlign: "center",
        borderRadius: 5,
        backgroundColor: "#f0f0f0",
        marginBottom: 15,
        marginTop: 5,
        borderWidth: 1,
        borderColor: "#CCCCCC",
    },
    closeButton: {
        alignItems: "flex-end",
      },
    
      modalHeader: {
        flexDirection: "row",
        marginBottom: 10,
      },
      modalHeaderContent: {
        flexGrow: 1,
      },
      modalButton: {
        flexDirection: "row",
        justifyContent: "flex-end",
      }
  });

export default AddAccount;