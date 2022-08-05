import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from '@rneui/base';
import Icon from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { auth, db } from '../firebase'
import { collection, getDocs, query, where, setDoc, doc, serverTimestamp, updateDoc, arrayUnion } from 'firebase/firestore';

const AddChat = ({navigation}) => {

    const [chatName, setChatName] = useState("")
    const [selectedUserEmail, setSelectedUserEmail] = useState("")
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerBackTitle: "Chats",
        })
    }, [navigation])

    const createChat = async () => {
        let selectedUserID = await getSelectedUserID()
        if ( selectedUserID!= null) {
            let collectionRef = collection(db, 'chats')
            let docRef = doc(collectionRef)
            await updateDoc(doc(db, 'user', auth.currentUser.uid), {groups: arrayUnion(docRef.id)})
            await updateDoc(doc(db, 'user',selectedUserID), {groups: arrayUnion(docRef.id)})
            await setDoc(docRef, {
                createdAt: serverTimestamp(),
                createdBy: auth.currentUser.uid,
                members : [auth.currentUser.uid, selectedUserID],
                id: docRef.id,
                name: chatName,
            }).then(()=> {
                navigation.goBack()
            }).catch((error) => alert(error.message))
        }
        else {
            alert("User does not exist")
        }
    }

    const getSelectedUserID = async () => {
        console.log("enter")
        const collectionSnapshot = collection(db, "user");
        const userQuery = query(collectionSnapshot, where("email", "==", selectedUserEmail))
        const querySnapshot = await getDocs(userQuery)
        let uid = null;
        querySnapshot.forEach((doc) => {
            uid = doc.data().uid
        });
        return uid;
    }

    return (
        <View style={styles.container}>
            <Input 
                placeholder="Add User"
                value={selectedUserEmail}
                autoFocus
                autoCapitalize='none'
                onChangeText={(text) => setSelectedUserEmail(text)}
                leftIcon={
                    <AntDesign name="addusergroup" type="antdesign" size={24} color="black" />
                }
            />
            <Input 
                placeholder="Enter a chat name"
                value={chatName}
                // onSubmitEditing={createChat}
                onChangeText={(text) => setChatName(text)}
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24} color="black" />
                }
            />
            <Button
                disabled={!chatName}
                title="Create new Chat"
                onPress={createChat}
                // onPress={checkUserExists ? console.log("on press: true"): console.log("on press: false")}
            />
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: 100,
    }
})