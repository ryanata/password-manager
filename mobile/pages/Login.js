import { StyleSheet, Button, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const Login = ({ navigation }) => {
    return ( 
        <View style={styles.container}>
            <Text>Login</Text>
            <Button
                title="Don't have an account? Sign Up"
                onPress={() => navigation.navigate('Signup')}
            />
            <Button
                title="Dashboard"
                onPress={() => navigation.navigate('Dashboard')}
            />
        </View>
     );
}
 
export default Login;