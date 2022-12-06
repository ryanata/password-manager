import React from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native';


const Avatar = ({site}) => {

    //console.log(site);
    const iconSize = 64
    return(
        <Image
            style={{marginLeft:10, width: 32, height: 32, resizeMode: 'contain', borderRadius: 32/6, overflow: "hidden"}}
            source={{uri:`https://www.google.com/s2/favicons?&domain=${site}&sz=${iconSize}`}}
        />
    )
}

export default Avatar