import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity, Modal, Pressable, TextInput, } from 'react-native';
import {useForm, Controller} from 'react-hook-form';

const EditProfile = ({modalVisible, setModalVisible, user}) =>{
    //console.log(user);
    const {setValue, handleSubmit, errors, control} = useForm({
        defaultValues: {
            'firstName': '',
            'lastName': '',
            'email': '',
            'phoneNumber': ''
        }
    });
    return(
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.EditProfile}>Edit Profile</Text>
                        {/*<TextInput style={styles.firstNameInput}>First Name</TextInput>*/}
                        <Text style={styles.firstName}>First Name</Text>
                        <Text style={styles.lastName}>Last Name</Text>
                        <Text style={styles.email}>Email</Text>
                        <Text style={styles.phoneNumber}>Phone Number</Text>
                        <View style={styles.controlNameInput}>
                            <Controller
                                control={control}
                                name = "firstName"
                                render = {({field: {onChange, value} }) => (
                                    <TextInput
                                        style={styles.firstNameInput}
                                        placeholder="first name"
                                        placeholderTextColor="#003f5c"
                                        autoCapitalize='none'
                                        onChangeText={value => onChange(value)}
                                    >{user.name.firstName}</TextInput>
                                )}
                            />
                        </View>
                        <View style={styles.controlNameInput}>
                            <Controller
                                control={control}
                                name = "lastName"
                                render = {({field: {onChange, value} }) => (
                                    <TextInput
                                        style={styles.lastNameInput}
                                        placeholder="last name"
                                        placeholderT
                                        t   extColor="#003f5c"
                                        autoCapitalize='none'
                                        onChangeText={value => onChange(value)}
                                    >{user.name.lastName}</TextInput>
                                )}
                            />
                        </View>
                        <View style={styles.controlNameInput}>
                            <Controller
                                control={control}
                                name = "email"
                                render = {({field: {onChange, value} }) => (
                                    <TextInput
                                        style={styles.emailInput}
                                        placeholder="email"
                                        placeholderTextColor="#003f5c"
                                        autoCapitalize='none'
                                        onChangeText={value => onChange(value)}
                                    >{user.email}</TextInput>
                                )}
                            />
                        </View>
                        <View style={styles.controlNameInput}>
                            <Controller
                                control={control}
                                name = "phoneNumber"
                                render = {({field: {onChange, value} }) => (
                                    <TextInput
                                        style={styles.phoneInput}
                                        placeholder="phone number"
                                        placeholderTextColor="#003f5c"
                                        autoCapitalize='none'
                                        onChangeText={value => onChange(value)}
                                    >{user.phone}</TextInput>
                                )}
                            />
                        </View>
                        

                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Text style={styles.textStyle}>Submit</Text>
                        </Pressable>
                    </View>
                </View>
             </Modal>
        </View> 
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 90,
      height: 390,
      width: 375,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 1,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 15,
      width: 100,
      elevation: 2,
      bottom: 100,
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
    EditProfile:{
        fontSize: 20,
        //right: 130,
        bottom: 70,
        width: 100,
    },
    controlNameInput:{
        backgroundColor: "#ffffff",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: 'center',
        borderColor: 'grey',

    },
    firstNameInput:{
        fontSize: 20,
        height: 45,
        width: 120,
        //flex: 1,
        padding: 10,
        bottom: 8,
        right: 110,
        margin: 12,
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 1,
        alignItems: "center",
        position: 'absolute',
    },
    lastNameInput:{
        fontSize: 20,
        height: 45,
        width: 120,
        //flex: 1,
        padding: 10,
        bottom: 85,
        left: 100,
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 1,
        alignItems: "center",
        position: 'absolute',
    },
    emailInput:{
        fontSize: 20,
        height: 45,
        width: 170,
        //flex: 1,
        padding: 10,
        bottom:50,
        left: -105,
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 1,
        alignItems: "center",
        position: 'absolute',
    },
    phoneInput:{
        fontSize: 20,
        height: 45,
        width: 140,
        //flex: 1,
        padding: 10,
        bottom: 115,
        left: 100,
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 1,
        alignItems: "center",
        position: 'absolute',
    },
    firstName: {
        width: 100,
        fontSize: 20,
        bottom: 310,
        right: 260,
        position: 'absolute',
    },
    lastName: {
        width: 100,
        fontSize: 20,
        bottom: 310,
        left: 220,
        position: 'absolute',
    },
    email:{
        width: 50,
        fontSize: 20,
        bottom: 210,
        right: 310,
        position: 'absolute',
    },
    phoneNumber:{
        width: 135,
        fontSize: 20,
        bottom: 210,
        left: 220,
        position: 'absolute'
    }

  });

export default EditProfile;
