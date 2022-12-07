import { useState } from "react";
import * as React from 'react'
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, TouchableOpacity } from "react-native";
import axios from 'axios';
import {useForm, Controller} from 'react-hook-form';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from 'react-query';


const ControllerInput = ({control, name, placeholder, ...rest}) => {
  return (
    <Controller
      control= {control}
      name={name}
      render={({field: {onChange, value} }) =>  (
        <TextInput
            required={true}
            style={styles.textInput}
            placeholder={placeholder}
            autoCapitalize='none'
            placeholderTextColor={"#003f5c"}
            onSubmitEditing={() => {}}
            onChangeText={value => onChange(value)}
            {...rest}
        />
      )}
      rules={{
        minLength: {
          value: 1,
          message: 'field is empty'
        }
      }}
    />
  )
}
const AddAccount = ({vaultId}) => {
  const navigation = useNavigation();
	const [modalVisible, setModalVisible] = useState(false);
  const queryClient = useQueryClient();
	const {setValue, handleSubmit, formState: {errors, isValid}, control} = useForm({
		defaultValues:{
      url: '',
      name: '',
      username: '',
      password: '',
		}
	})
    
  const formHandler = (values) => {
      //check if fields are empty
      if(values.url.trim().length === 0 || 
      values.username.trim().length === 0 || 
      values.password.trim().length === 0 ||
      values.name.trim().length === 0){
          Alert.alert("Please fill out all fields");
          return
      }
      
      axios.post(`https://pwdly.herokuapp.com/api/vault/${vaultId}/site/account`, {
          name: values.name,
          url: values.url,
          username: values.username,
          password: values.password,
      }).then((res) => {
          queryClient.invalidateQueries(`getVault_${vaultId}`);
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
            style={{backgroundColor: "red"}}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                    <MaterialCommunityIcons
                        name="close"
                        size={25}
                        color={'#000000'}
                    />
                  </TouchableOpacity>
                </View>
                <ControllerInput control={control} name="name" placeholder="Facebook"/>
                <ControllerInput control={control} name="url" placeholder="facebook.com"/>
                <ControllerInput control={control} name="username" placeholder="JohnDoe11"/>
                <ControllerInput control={control} name="password" placeholder="***********" secureTextEntry/>
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
      width: "80%",
      height: 350,
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 10,
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
      padding: 10,
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
    textInput: {
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
      
    },
    modalHeader: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "flex-end",
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
