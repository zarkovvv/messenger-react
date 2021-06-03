import React, {useState} from 'react';
import './ChatInput.scss';
import {Send} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import {useSelector} from "react-redux";
import {selectChatId} from "../../../features/chatSlice";
import firebase from "firebase/app";
import "firebase/firestore";
import db from "../../../firebase";
import {selectUser} from "../../../features/userSlice";

const ChatInput = () => {

    const chatId = useSelector(selectChatId);
    const user = useSelector(selectUser);

    const [input, setInput] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();
        if (input !== '') {
            db.collection('chats').doc(chatId).collection('messages').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                uid: user.uid,
                photo: user.photo,
                email: user.email,
                displayName: user.displayName
            })
            db.collection('chats').doc(chatId).update({timestamp: firebase.firestore.FieldValue.serverTimestamp()});
            setInput('');
        }
    };

    return (
        <div className="chat-input">
            <form onSubmit={sendMessage}>
                <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="iMessage"/>
            </form>
            <IconButton onClick={sendMessage}>
                <Send className="send-icon" />
            </IconButton>
        </div>
    );
};

export default ChatInput;
