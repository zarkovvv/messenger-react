import React from 'react';
import './ChatHeader.scss';
import {useSelector} from "react-redux";
import {selectChatName} from "../../../features/chatSlice";

const ChatHeader = () => {

    const chatName = useSelector(selectChatName);

    return (
        <div className="chat-header">
            <h4>To: <span className="chat-name">{chatName}</span></h4>
            <strong>Details</strong>
        </div>
    );
};

export default ChatHeader;
