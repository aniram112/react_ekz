import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';

import { signOut } from 'firebase/auth';
import { auth, app, db, getFirestore, doc, setDoc, getDoc } from "../firebase/config.js";
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function Chat({ navigation }) {

    const [messages, setMessages] = useState([]);

    const onSignOut = () => {
        signOut(auth).catch(error => console.log('Error logging out: ', error));
        navigation.navigate("Login")
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



    useEffect(() => {
        const collectionRef = collection(db, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, querySnapshot => {
            setMessages(
                querySnapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: "12.12.2023",//doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
            );
        });

        return () => unsubscribe();
    }, []);


    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages)
        );
        const { _id, createdAt, text, user } = messages[0];
        addDoc(collection(db, 'chats'), {
            _id,
            createdAt,
            text,
            user
        });
    }, []);


    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                avatar: 'https://i.pravatar.cc/300'
            }}
        />
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontWeight: 700,
    },
    chat: {
        paddingBottom: 50,
        marginBottom: 50,
    },
});