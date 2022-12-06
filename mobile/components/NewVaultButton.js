import { useState } from "react";
import * as React from 'react'
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";
import axios from 'axios';
import {useForm, Controller} from 'react-hook-form';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createVault } from "../helpers/Hooks";


const NewVaultButton = (props) => {
	const [state, setState] = useState('')
	const [modalVisible, setModalVisible] = useState(false);
	const {setValue, handleSubmit, formState: {errors, isValid}, control} = useForm({
		defaultValues:{
			vaultName: '',
			masterPassword: ''
		}
	})

  const createVaultApiCall = (data) => {
    {/* need to get user id (user.userId). For api call */}
    if(data.vaultName.trim().length === 0){
        Alert.alert("Fill out all fields");
        setModalVisible(!modalVisible)
        return
    }
    if(data.masterPassword.length === 0){
        Alert.alert("Fill out all fields");
        setModalVisible(!modalVisible)
        return
    }
    createVault(props.userId, data.vaultName, data.masterPassword)
        .then((res) => {
            if (res.status === 201) {
                console.log("vault created successfully")
                Alert("Vault created Successfully")
            }
		}).catch((err) => {
			
			if (err.status === 400){
				console.log("error")
				setState({ alert: err.response.data.message});
                Alert.alert(err.response.data.message)
			} else {
				setState({ alert: "an error occured"});
                Alert.alert("Error: Failed vault creation")
			}
		})
    setModalVisible(!modalVisible)
  }

  return (
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
                <Controller
                  control= {control}
                  name="vaultName"
                  render={({field: {onChange, value} }) =>(
                      	<TextInput
						required={true}
						style={styles.TextInput}
						placeholder="Enter Vault name"
						autoCapitalize='none'
						placeholderTextColor={"#003f5c"}
						onSubmitEditing={event =>
						handleSubmit(createVaultApiCall)
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
                name="masterPassword"
                render={({field: {onChange, value} }) =>(
					<TextInput
					secureTextEntry={true}
					required={true}
					style={styles.TextInput}
					placeholder="Master Password"
					autoCapitalize='none'
					placeholderTextColor={"#003f5c"}
					onSubmitEditing={event =>
						handleSubmit(createVaultApiCall)
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
                onPress={handleSubmit(createVaultApiCall)}
                >
                  <Text style={styles.textStyle}>Create Vault</Text>
                </Pressable>

              </View>
            </View>
        </Modal>

        <Pressable
        onPress={() => {
          	setModalVisible(true)
        }}
        style={({ pressed }) => [styles.button, styles.buttonClose,{backgroundColor: pressed ? "#16578B" : "#2196F3"}]}
        >
			{({ pressed }) => (
                <Text style={{color: "white"}}>Add New Vault</Text>
			)}
        </Pressable>
    </View>
  );
};

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
    borderRadius: 20,
    padding: 10,
    elevation: 2
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
  },
});

export default NewVaultButton;