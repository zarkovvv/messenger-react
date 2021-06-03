import React from 'react';
import './ChatArea.scss';
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatBody from "./ChatBody/ChatBody";
import ChatInput from "./ChatInput/ChatInput";

const ChatArea = () => {
    return (
        <div className="chat">
            <ChatHeader />
            <ChatBody />
            <ChatInput />
        </div>
    );
};

export default ChatArea;
