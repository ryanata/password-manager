import { StyleSheet, Text, Button, View, Image, Pressable, TouchableOpacity, Alert } from 'react-native';
import * as Progress from 'react-native-progress';

const requirements = [
    { re: /[0-9]/, label: "Includes number" },
    { re: /[a-z]/, label: "Includes lowercase letter" },
    { re: /[A-Z]/, label: "Includes uppercase letter" },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

    export function PasswordStrength({ passwordStrength }) {

    const bars = [];
    bars.push(
        <Progress.Bar 
            styles={{ bar: { transitionDuration: "0ms", justifyContent: "space-evenly" } }}
            color={passwordStrength > 3 ? "green" : passwordStrength ==2 || passwordStrength == 3  ? "yellow" : "red"}
            borderColor={passwordStrength > 3 ? "green" : passwordStrength > 1 ? "yellow" : "red"}
            progress={1} 
            width={75}
            margin={5}
            key={0}
        />,
        <Progress.Bar 
            styles={{ bar: { transitionDuration: "0ms", justifyContent: "space-evenly" } }}
            color={passwordStrength > 3 ? "green" :  passwordStrength == 2 || passwordStrength == 3  ? "yellow" : "#F5F5F5"}
            borderColor={passwordStrength > 3 ? "green" :  passwordStrength == 2 || passwordStrength == 3  ? "yellow" : "#F5F5F5"}
            progress={1} 
            width={75}
            margin={5}
            key={1}
        />,
        <Progress.Bar 
            styles={{ bar: { transitionDuration: "0ms", justifyContent: "space-evenly" } }}
            color={passwordStrength > 3 ? "green" :   passwordStrength == 3  ? "yellow" : "#F5F5F5"}
            borderColor={passwordStrength > 3 ? "green" :  passwordStrength == 3  ? "yellow" : "#F5F5F5"}
            progress={1} 
            width={75}
            margin={5}
            key={2}
        />,
        <Progress.Bar 
            styles={{ bar: { transitionDuration: "0ms", justifyContent: "space-evenly" } }}
            color={passwordStrength > 3 ? "green" : passwordStrength > 1 ? "#F5F5F5" : "#F5F5F5"}
            borderColor={passwordStrength > 3 ? "green" : passwordStrength > 1 ? "#F5F5F5" : "#F5F5F5"}
            progress={1} 
            width={75}
            margin={5}
            key={3}
        />
    );

    return (
        <View style={{flexDirection: 'row'}}>{bars}</View>      
    );
}

const styles = StyleSheet.create({
    bar: {
        borderColor:"#B6B6B6"
    },
})