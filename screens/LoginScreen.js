import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView} from 'react-native';
import { Image, Input, Button } from '@rneui/base';
import { StatusBar } from "expo-status-bar";
import { NavigationContext } from 'react-navigation';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authUser => {
            if(authUser) {
                navigation.replace("Home")
            }
        })
        return unsubscribe;
    }, [])

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .catch(error => alert(error))
    }
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light"/>
            <Image 
            source={{
                uri: "http://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
            }}
            style={{ width: 200, height: 200}}
            />
            <View style={styles.inputContainer}>
                <Input placeholder='Email' autoFocus type='email' autoCapitalize='none' value={email}
                    onChangeText={(text) => setEmail(text)}/>
                <Input placeholder='Password' secureTextEntry type='password' value={password}
                    onChangeText={(text) => setPassword(text)}/>
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title='Login'/>
            <Button containerStyle={styles.button} onPress={()=> navigation.navigate('Register')} type='outline' title='Register'/>
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white"
    },
    inputContainer:{
        width: 300
    },
    button:{
        width: 200,
        marginTop: 10
    },
});