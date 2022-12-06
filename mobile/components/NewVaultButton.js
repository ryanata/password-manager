import { useState } from "react";
import * as React from 'react'
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, TouchableOpacity } from "react-native";
import axios from 'axios';
import {useForm, Controller} from 'react-hook-form';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createVault } from "../helpers/Hooks";
import { useQueryClient } from 'react-query';


const NewVaultButton = (props) => {
	const [state, setState] = useState('')
	const [modalVisible, setModalVisible] = useState(false);
  const queryClient = useQueryClient();
  const userId = queryClient.getQueryData('getUser')._id;

	const {setValue, handleSubmit, formState: {errors, isValid}, control} = useForm({
		defaultValues:{
			vaultName: '',
			masterPassword: ''
		}
	})

  const createVaultApiCall = (data) => {
    {/* need to get user id (user.userId). For api call */}
    if(data.vaultName.trim().length === 0 || data.masterPassword.length){
        Alert.alert("Please fill out all fields");
        setModalVisible(!modalVisible)
        return
    }
    createVault(userId, data.vaultName, data.masterPassword)
        .then((res) => {
            if (res.status === 201) {
                console.log("vault created successfully");
                Alert.alert("Vault created Successfully");
                // Refetch the vaults
                queryClient.invalidateQueries('getVaults');
                queryClient.invalidateQueries('getUser');
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
          setModalVisible(false);
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
                  control={control}
                  name="vaultName"
                  render={({field: {onChange, value} }) => (
                      	<TextInput
                          required={true}
                          style={styles.TextInput}
                          placeholder="Enter Vault Name"
                          autoCapitalize='none'
                          placeholderTextColor={"#003f5c"}
                          padding={10}
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
                render={({field: {onChange, value} }) => (
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
          style={({ pressed }) => [styles.addButton, styles.addButtonClose,{backgroundColor: pressed ? "#16578B" : "#2196F3"}]}
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
    width: "70%",
    height: "30%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 35,
    paddingTop: 17,
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
  addButton: {
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    elevation: 2
  },
  addButtonClose: {
    backgroundColor: "#2196F3",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 25,
    marginTop: 20,
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

export default NewVaultButton;