import React, {useState} from 'react';
import './ChatInput.scss';
import {Send} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import {useSelector} from "react-redux";
import {selectChatId} from "../../../features/chatSlice";
import "firebase/firestore";
import {selectUser} from "../../../features/userSlice";
import {sendMessage} from "../../../functions/functions";

const ChatInput = () => {

    const chatId = useSelector(selectChatId);
    const user = useSelector(selectUser);

    const [input, setInput] = useState('');

    return (
        <div className="chat-input">
            <form onSubmit={(e) => sendMessage(e, input, setInput, chatId, user)}>
                <input disabled={chatId === null} value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Send a message..."/>
            </form>
            <IconButton className="send-button" onClick={(e) => sendMessage(e, input, setInput, chatId, user)}>
                <Send className="send-icon" />
            </IconButton>
        </div>
    );
};

export default ChatInput;
