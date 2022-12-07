import React from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import EditProfile from '../components/EditProfileModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getMe } from '../hooks/getAllVaultsQuery';
import {useQuery} from 'react-query';
import { useState } from 'react';

const Settings = ({route}) => {
    const navigation = useNavigation();
    const { data: user, isLoading, isError } = useQuery("getUser", () => getMe());

    if (isLoading) {
        return <Text>Loading...</Text>;
    }
    
    if (isError) {
        return <Text>Error: {isError.message}</Text>;
    }

    const phone = user.phone.toString();
    const formattedPhone = phone ? `(${phone?.slice(0, 3)}) ${phone?.slice(3, 6)}-${phone?.slice(6, 10)}` : "";
    const [modalVisible, setModalVisible] = useState(false);
    return(
        <View style={styles.container}>
            <Text style={styles.myAccountText}>My Account</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                <MaterialCommunityIcons style={styles.icon} name="account" size={48} color={'black'}/>
                <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                    <Text style={{color:'white'}}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            <View style={{padding: 40}}>
                <Text style={styles.nameText}>NAME:</Text>
                <Text style={styles.userNameText}>{user.name.firstName} {user.name.lastName}</Text>
                <Text style={styles.emailText}>EMAIL:</Text>
                <Text style={styles.userEmailText}>{user.email}</Text>
                <Text style={styles.phoneText}>PHONE NUMBER:</Text>
                <Text style={styles.userphoneText}>{formattedPhone}</Text>
            </View>
            
            {modalVisible && <EditProfile modalVisible={modalVisible} setModalVisible={setModalVisible} user={user}/>}
        </View> 
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    myAccountText : {
        fontSize: 25,
        paddingLeft: 40,
        marginTop: 30,
        marginBottom: 30,
    },
    icon:{
        padding: 10,
        borderWidth: 1,
        // icon size + padding + container padding = 48 + 10 + 10 = 68
        borderRadius: 68/2,
    },
    nameText:{
        fontSize: 15
    },
    userNameText:{
        fontSize: 25,
        marginBottom: 10,
    },
    emailText:{
        fontSize: 15
    },
    userEmailText:{
        fontSize: 25,
        marginBottom: 10
    },
    phoneText:{
        fontSize: 15
    },
    userphoneText:{
        fontSize: 25,
        marginBottom: 10
    },
    editButton:{
        backgroundColor:'#4681D0',
        borderRadius: 7,
        color: 'red',
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default Settings;