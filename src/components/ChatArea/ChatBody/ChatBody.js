import React, {useEffect, useState, useRef} from 'react';
import './ChatBody.scss';
import Message from "./Message/Message";
import {useSelector} from "react-redux";
import {selectChatId} from "../../../features/chatSlice";
import db from "../../../firebase";
import FlipMove from "react-flip-move";

const ChatBody = () => {

    const chatId = useSelector(selectChatId);
    const [messages, setMessages] = useState([]);

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        if (chatId) {
            db.collection('chats').doc(chatId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })));
            })
        }
    }, [chatId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages])

    return (
        <div className="messages">
            <FlipMove>
                {messages.map(message => (<Message key={message.id} contents={message.data} />))}
            </FlipMove>
            <div ref={messagesEndRef} />
        </div>
    );
};

export default ChatBody;
