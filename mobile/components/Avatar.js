import React from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native';


const Avatar = ({site}) => {

    console.log(site);
    const iconSize = 48
    return(
        <Image
            style={{width: '100%', height: '50%'}}
            source={{uri:'https://www.google.com/s2/favicons?domain=${site}&sz=${iconSize}'}}
        />
    )
}

export default Avatar