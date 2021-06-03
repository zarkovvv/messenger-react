import React, {useEffect, useState} from 'react';
import './Chat.scss';
import {Avatar} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {setChat} from "../../../features/chatSlice";
import db from "../../../firebase";
import * as timeago from "timeago.js";

const Chat = (props) => {

    const dispatch = useDispatch();
    const [chatInfo, setChatInfo] = useState([]);

    useEffect(() => {
        db.collection('chats').doc(props.id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {setChatInfo(snapshot.docs.map(doc => doc.data()))})
    }, [props.id]);

    return (
        <div className="sidebar-chat" onClick={() => dispatch(setChat({chatId: props.id, chatName: props.chatName}))}>
            <Avatar src={chatInfo[0]?.photo} className="chat-avatar"/>
            <div className="sidebar-chat-info">
                <h3>{props.chatName}</h3>
                <p>{chatInfo[0]?.message.length > 17 ? chatInfo[0]?.message.substr(0, 17) + "..." : chatInfo[0]?.message}</p>
                <small>{timeago.format(new Date(chatInfo[0]?.timestamp?.toDate()))}</small>
            </div>
        </div>
    );
};

export default Chat;
