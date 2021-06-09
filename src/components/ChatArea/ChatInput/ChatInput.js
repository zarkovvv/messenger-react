import React, {useRef, useState} from 'react';
import './ChatInput.scss';
import {Image, Send} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import {useSelector} from "react-redux";
import {selectChatId} from "../../../features/chatSlice";

import uniqid from 'uniqid';

import "firebase/firestore";
import app from "firebase/app";
import firebase from "firebase/app";
import 'firebase/storage';
import db from '../../../firebase'

import {selectUser} from "../../../features/userSlice";
import {sendMessage} from "../../../functions/functions";


const ChatInput = () => {

    const chatId = useSelector(selectChatId);
    const user = useSelector(selectUser);

    const [input, setInput] = useState('');
    const imageUploadInput = useRef(null);

    async function handleUpload(e) {
        e.preventDefault();
        const file = e.target.files[0];

        Object.defineProperty(file, 'name', {
            writable: true,
            value: `${uniqid()}.${file.type.split("/")[1]}`
        });

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

        imageUploadInput.current.value = '';
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
                       ref={imageUploadInput}
                />
                <Image className="picture-icon"/>
            </IconButton>
        </div>
    );
};

export default ChatInput;
