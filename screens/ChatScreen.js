import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ChatScreen = ({ navigation, route }) => {
    return (
        <View>
            <Text>{route.params.chatname}</Text>
        </View>
    )
}

export default ChatScreen;

const styles = StyleSheet.create({});