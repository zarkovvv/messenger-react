import React, {useState} from 'react';
import './ChatInput.scss';
import {Image, Send} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import {useSelector} from "react-redux";
import {selectChatId} from "../../../features/chatSlice";
import "firebase/firestore";
import {selectUser} from "../../../features/userSlice";
import {sendMessage} from "../../../functions/functions";

import app from "firebase";
import firebase from "firebase/app";
import db from '../../../firebase'
const ChatInput = () => {

    const chatId = useSelector(selectChatId);
    const user = useSelector(selectUser);

    const [input, setInput] = useState('');

    async function handleUpload(e) {
        e.preventDefault();
        const file = e.target.files[0];
        const storageRef = app.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        const fileUrl = await fileRef.getDownloadURL();

        db.collection('chats').doc(chatId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            image: fileUrl,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName
        });
    }

    return (
        <div className="chat-input">
            <form onSubmit={(e) => sendMessage(e, input, setInput, chatId, user)}>
                <input disabled={chatId === null} value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Send a message..."/>
            </form>
            <IconButton className="send-button" onClick={(e) => sendMessage(e, input, setInput, chatId, user)}>
                <Send className="send-icon" />
            </IconButton>
            <IconButton component="label" className="image-button">
                <input type="file"
                       multiple={false}
                       id="upload-button"
                       style={{display: 'none'}}
                       onChange={handleUpload}
                />
                <Image className="picture-icon"/>
            </IconButton>
        </div>
    );
};

export default ChatInput;
