import React, {useRef, useState} from 'react';
import './ChatInput.scss';
import {Image, Send} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import {useSelector} from "react-redux";
import {selectChatId} from "../../../features/chatSlice";



import {selectUser} from "../../../features/userSlice";
import {handleUpload, sendMessage} from "../../../functions/functions";

const ChatInput = () => {

    const chatId = useSelector(selectChatId);
    const user = useSelector(selectUser);

    const [input, setInput] = useState('');
    const imageUploadInput = useRef(null);

    return (
        <div className="chat-input">
            <form onSubmit={(e) => sendMessage(e, input, setInput, chatId, user)}>
                <input disabled={chatId === null} value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Send a message..."/>
            </form>
            <IconButton disabled={chatId === null} className="send-button" onClick={(e) => sendMessage(e, input, setInput, chatId, user)}>
                <Send className="send-icon" />
            </IconButton>
            <IconButton disabled={chatId === null} component="label" className="image-button">
                <input type="file"
                       multiple={false}
                       id="upload-button"
                       style={{display: 'none'}}
                       onChange={(e) => handleUpload(e, imageUploadInput, user, chatId)}
                       ref={imageUploadInput}
                />
                <Image className="picture-icon"/>
            </IconButton>
        </div>
    );
};

export default ChatInput;
