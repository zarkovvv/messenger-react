import React, {useState} from 'react';
import './ChatInput.scss';
import {MicNone} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import {useSelector} from "react-redux";
import {selectChatId} from "../../../features/chatSlice";
import firebase from "firebase";
import db from "../../../firebase";
import {selectUser} from "../../../features/userSlice";

const ChatInput = () => {

    const chatId = useSelector(selectChatId);
    const user = useSelector(selectUser);

    const [input, setInput] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('chats').doc(chatId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName
        })
        setInput('');
    };

    return (
        <div className="chat-input">
            <form>
                <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="iMessage"/>
                <button className="submit-button" onClick={sendMessage}>Send message</button>
            </form>
            <IconButton>
                <MicNone className="chat-mic" />
            </IconButton>
        </div>
    );
};

export default ChatInput;
