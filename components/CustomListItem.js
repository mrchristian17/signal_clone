import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, ListItem } from '@rneui/base';

const CustomListItem = ({ id, chatName, enterChat}) => {
    return(
        <ListItem>
            <Avatar rounded source={
                { uri: "https://connectingcouples.us/wp-content/uploads/2019/07/avatar-placeholder.png"}
            }/>
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight:"800"}}>Dev Chat</ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    Welcom to DevChat
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem;

const styles = StyleSheet.create({})