import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from '@rneui/base';
import Icon from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { db } from '../firebase'
import { addDoc, collection, getDocs, query, where, setDoc, doc } from 'firebase/firestore';

const AddChat = ({navigation}) => {

    const [chatName, setChatName] = useState("")
    const [selectedUser, setSelectedUser] = useState("")
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerBackTitle: "Chats",
        })
    }, [navigation])

    const createChat = async () => {
        if ( await checkUserExists() ) {
            // await addDoc(collection(db, 'chats'), {chatName: chatName})
            // const { id: docID } = await addDoc(collection(db, 'groups'), 
            // {
            //     createdAt: "6-6-22",
            //     members : [],
            //     id: "",
            //     name: chatName,

            // })
            // // console.log("DOc before then: " + docID)
            // .then(() => {
            //     console.log("docID: " + docID)
            //     const updateDocId = doc(db, "groups", docID) ;
            //     updateDoc(updateDocId, {
            //       id: docID
            //   })
            //     navigation.goBack()
            //     })
            // .catch((error) => alert(error.message) )

            let collectionRef = collection(db, 'groups')
            let docRef = doc(collectionRef)
            await setDoc(docRef, {
                createdAt: "6-6-22",
                members : [],
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

    const checkUserExists = async () => {
        console.log("enter")
        const collectionSnapshot = collection(db, "user");
        const userQuery = query(collectionSnapshot, where("email", "==", selectedUser))
        const querySnapshot = await getDocs(userQuery)
        let queryExists = false;
        querySnapshot.forEach((doc) => {
            // console.log(doc.data + " : " + "true")
            queryExists = true;
        });
        console.log("queryExists = " + queryExists)
        return queryExists;
    }

    return (
        <View style={styles.container}>
            <Input 
                placeholder="Add User"
                value={selectedUser}
                autoFocus
                autoCapitalize='none'
                onChangeText={(text) => setSelectedUser(text)}
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