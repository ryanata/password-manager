import React from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import EditProfile from '../components/EditProfileModal';
import { useState } from 'react';





const Settings = ({route}) => {
    
    const navigation = useNavigation();

    const user = route.params.user
   // console.log(user.phone)

    const phone = user.phone.toString();
    const formattedPhone = phone ? `(${phone?.slice(0, 3)}) ${phone?.slice(3, 6)}-${phone?.slice(6, 10)}` : "";
    const [modalVisible, setModalVisible] = useState(false);
    return(
    <View style={styles.container}>
        <View style = {styles.aBox}>
            <Text style = {styles.myAccountText}>Profile</Text>
            <Image style={styles.icon} source={require('../assets/userIcon.png')}></Image> 
            <Text style={styles.nameText}>NAME:</Text>
            <Text style={styles.userNameText}>{user.name.firstName} {user.name.lastName}</Text>
            <Text style={styles.emailText}>EMAIL:</Text>
            <Text style={styles.userEmailText}>{user.email}</Text>
            <Text style={styles.phoneText}>PHONE NUMBER:</Text>
            <Text style={styles.userphoneText}>{formattedPhone}</Text>
            <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                <Text style={{color:'white'}}>Edit Profile</Text>
            </TouchableOpacity>
            {modalVisible && <EditProfile modalVisible={modalVisible} setModalVisible={setModalVisible} user={user}/>}
        </View>

    </View> 
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'left',
    },
    myAccountText : {
        fontSize: 25,
        top: 20,
        left: 175,
    },
    aBox :{
        marginTop: 20,
        width: 120 * 4,
        height: 330,
        backgroundColor: '#FAF9F6',
        top:-20
    },
    icon:{
        left: 50,
        bottom: -40,
        backgroundColor: 'grey',
        height: 50,
        width: 50,
        padding: 20,
        borderRadius: 25,
        //borderColor: 'white',
        //borderWidth: 1,
    },
    nameText:{
        fontSize: 15,
        left: 50,
        bottom: -60,
    },
    userNameText:{
        fontSize:25,
        left: 50,
        bottom: -60,
    },
    emailText:{
        fontSize: 15,
        left: 50,
        bottom: -80,
    },
    userEmailText:{
        fontSize: 25,
        left: 50,
        bottom: -80,
    },
    phoneText:{
        fontSize: 15,
        left: 50,
        bottom: -100,
    },
    userphoneText:{
        fontSize: 25,
        left: 50,
        bottom: -102,
    },
    editButton:{
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor:'#4681D0',
        borderRadius: 7,
        color: 'red',
        width: 150,
        left: 210,
        bottom: 155,
        alignItems: 'center',   
    },
});


export default Settings;