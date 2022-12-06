import React from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native';


const Avatar = ({site}) => {

    //console.log(site);
    const iconSize = 32
    return(
        <Image
            style={{width: 32, height: 32, borderRadius: 32/6, overflow: "hidden", borderWidth: 1, borderColor: "white"}}
            source={{uri:`https://www.google.com/s2/favicons?domain=${site}&sz=${iconSize}`}}
        />
    )
}

export default Avatar