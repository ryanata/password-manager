import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity, Modal, Pressable, TextInput, Alert } from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import { useQueryClient } from 'react-query';
import axios from "axios";

const EditProfile = ({modalVisible, setModalVisible, user}) => {
    const {setValue, handleSubmit, errors, control} = useForm({
        defaultValues: {
            firstName: user.name.firstName,
            lastName: user.name.lastName,
            email: user.email,
            phoneNumber: `${user.phone}`
        }
    });
    const queryClient = useQueryClient();

    const formHandler = (values) => {
        const intPhoneNumber = parseInt(values.phoneNumber);
        const twoFA = user.twoFactorAuthEnabled ? true : false;
        axios
            .put(`https://pwdly.herokuapp.com/api/user/${user._id}/update`, {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phoneNumber: intPhoneNumber,
                twoFactorAuthEnabled: twoFA,
            })
            .then((res) => {
                queryClient.invalidateQueries("getUser");
            })
            .catch((err) => {
                console.log(err);
            });
        setModalVisible(false);
    }

    return(
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{textAlign: "left", fontWeight: "bold"}}>Edit Profile</Text>
                        <View style={{marginTop: 25, marginBottom: 5}}>
                            <View style={{flexDirection: "row"}}>
                                <View style={{flex: 1}}>
                                    <Text style={{}}>First Name</Text>
                                    <Controller
                                        control={control}
                                        name="firstName"
                                        render={({field: {onChange, value} }) => (
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder="first name"
                                                placeholderTextColor="#003f5c"
                                                autoCapitalize='none'
                                                value={value}
                                                onChangeText={value => onChange(value)}
                                            />
                                        )}
                                    />
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{}}>Last Name</Text>
                                    <Controller
                                        control={control}
                                        name="lastName"
                                        render={({field: {onChange, value} }) => (
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder="Last name"
                                                placeholderTextColor="#003f5c"
                                                autoCapitalize='none'
                                                value={value}
                                                onChangeText={value => onChange(value)}
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection: "row"}}>
                                <View style={{flex: 1}}>
                                    <Text style={{}}>Email</Text>
                                    <Controller
                                        control={control}
                                        name="email"
                                        render={({field: {onChange, value} }) => (
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder="Email"
                                                placeholderTextColor="#003f5c"
                                                autoCapitalize='none'
                                                value={value}
                                                onChangeText={value => onChange(value)}
                                            />
                                        )}
                                    />
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{}}>Phone Number</Text>
                                    <Controller
                                        control={control}
                                        name="phoneNumber"
                                        render={({field: {onChange, value} }) => (
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder="Phone number"
                                                placeholderTextColor="#003f5c"
                                                autoCapitalize='none'
                                                value={value}
                                                onChangeText={value => onChange(value)}
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 20}}>
                            <Pressable
                                style={styles.button}
                                onPress={handleSubmit(formHandler)}
                            >
                                <Text style={{textAlign: "center", color: "white", fontSize: 16}}>Submit</Text>
                            </Pressable>
                        </View>
                        
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
    },
    modalView: {
        width: "85%",
        height: 300,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        paddingTop: 17,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        paddingHorizontal: 10,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
      borderRadius: 10,
      padding: 15,
      width: "100%",
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
        width: "90%",
        textAlign: "left",
        borderRadius: 5,
        backgroundColor: "#f0f0f0",
        marginBottom: 15,
        marginTop: 5,
        borderWidth: 1,
        borderColor: "#CCCCCC",
      },

  });

export default EditProfile;