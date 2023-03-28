import { useNavigation } from '@react-navigation/core'
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text, StyleSheet,View, FlatList } from 'react-native';
import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth, app, db, getFirestore, doc, setDoc, getDoc } from "../firebase/config.js";
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';


function ChatRow(props) {
    return (
        <TouchableOpacity style={styles.cell} onPress={props.goToChat}>
            <MaterialCommunityIcons name="account-circle" size={60} color='#76D7C4' />
            <View>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.text}>{props.message}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default function ChatList({navigation}) {

    const goToChat = () => {
        navigation.navigate("Chat");
    };

    const onSignOut = () => {
        signOut(auth).catch(error => console.log('Error logging out: ', error));
        navigation.goBack();
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        marginRight: 15,
                    }}
                    onPress={onSignOut}
                >
                    <MaterialCommunityIcons name="logout" size={25} color='white' />
                </TouchableOpacity>
            )
        });
    }, [navigation]);


    return (
        <View style={{paddingTop:0}}>
            <ChatRow goToChat={goToChat} name="friend" message="hello my friend"/>
            <ChatRow goToChat={goToChat} name="nemesis" message="i hate you"/>
            <ChatRow goToChat={goToChat} name="spam" message="buy 3 get 2 only today!"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cell: {
        display: 'flex',
        flexDirection:'row',
        flexWrap: 'wrap',
        gap: 10,
        height: 70,
        borderTopWidth: 1,
        borderColor: "gray",
    },
    name: {
        paddingTop: 5,
        fontSize: 20,
        fontWeight: 600
    },
    text: {
        fontSize: 16
    },
});