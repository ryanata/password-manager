import React from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native';


const VaultRow = ({site}) => {
    return(
        <View style = {styles.container}>

            {/*change to view if whole row is not intended to be a button*/}
            <TouchableOpacity style = {styles.row}>
                <Text style = {styles.websiteUrl}>{site.name}</Text>
                {/* 
                    Please create a new component for avatar instead of this library
                    <Avatar 
                    containerStyle={{ backgroundColor: "#9700b9" , justifyContent: 'center', right: 150}}
                    size={48}
                    icon={{ name: "google", type: "font-awesome" }}         
                    src={`https://www.google.com/s2/favicons?domain=${site.url}&sz=${iconSize}`}           
                /> */}
                <TouchableOpacity>
                    {/*<Text style = {{size: 50, left: 500}}/>*/}
                    <Image style =  {{ left: 130, position: 'absolute',bottom: 0}} source = {require('/Users/khaledtujjar/password-manager/mobile/assets/chevron-right-solid-24.png')} />
                </TouchableOpacity>
            </TouchableOpacity>
            
        </View>
    )
}




const styles = StyleSheet.create({
    container:{
        flex: 1,
        //padding: 20,
        //backgroundColor: '#4681D0',
        backgroundColor: '#ffffff',
        flexDirection: "column",
    },
    row: {
        backgroundColor: '#ffffff',
        flex:1/9,
        top: 100,
        alignItems:'center',
        borderBottomColor: '#B8B8B8',
        borderBottomWidth: 0.7,
        borderTopWidth: 0.7,
        borderTopColor: '#B8B8B8',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    websiteUrl:{
        fontSize: 25,
        position: 'absolute',
    },
    avatar:
    {
        left: 100,
        alighnItems: 'left',
        position: 'absolute',
    },
});

export default VaultRow;