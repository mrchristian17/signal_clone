import React, { useLayoutEffect, useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomListItems from '../components/CustomListItem'
import { auth } from '../firebase';
import { Avatar } from '@rneui/base';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { db } from '../firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore';

const HomeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([])

    useEffect(() => {
        const q = query(collection(db, "chats"), where('members', 'array-contains', auth.currentUser.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setChats(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        })
        return unsubscribe;
    }, [])

    const signOutUser = () => {
        auth.signOut().then(()=> {
            navigation.replace("Login")
        })
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: {backgroundColor: "#fff"},
            headerTitleStyle: {color: "black"},
            headerTitleColor: "black",
            headerLeft: () => (
                <View style={{marginLeft: 20}}>
                    <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
                        <Avatar 
                            rounded
                            source={{ 
                                uri: auth?.currentUser?.photoURL
                            }}
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
                        <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )
        })

    }, [navigation])

    const enterChat = (id, chatName) =>{
        navigation.navigate("Chat", {
            id: id,
            chatName: chatName,
        })
    }
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
            {chats.map(({ id, data: {chatName} }) => (
                    <CustomListItems key={id} id={id} chatName={chatName} enterChat={enterChat}/>
                ))}  
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({})