import { StyleSheet, Text, Button, View, Image, Pressable, TouchableOpacity, Alert } from 'react-native';
import * as Progress from 'react-native-progress';

const requirements = [
    { re: /[0-9]/, label: "Includes number" },
    { re: /[a-z]/, label: "Includes lowercase letter" },
    { re: /[A-Z]/, label: "Includes uppercase letter" },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

    export function PasswordStrength({ password }) {
    const strength = getStrength(password);

    const bars = Array(4)
        .fill(0)
        .map((_, index) => (
            <Progress.Bar 
            styles={{ bar: { transitionDuration: "0ms", justifyContent: "space-evenly" } }}
            value={password.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0}
            color={strength > 80 ? "green" : strength > 50 ? "yellow" : "red"}
            borderColor={strength > 80 ? "green" : strength > 50 ? "yellow" : "red"}
            key={index}
            progress={1} 
            width={75}
            margin={5}
            />
        ));

    return (
        <View style={{flexDirection: 'row'}}>{bars}</View>      
    );
}

const styles = StyleSheet.create({
    bar: {
        borderColor:"#B6B6B6"
    },
})