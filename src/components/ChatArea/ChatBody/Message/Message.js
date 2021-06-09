import React, {forwardRef} from 'react';
import './Message.scss';
import {Avatar} from "@material-ui/core";
import {useSelector} from "react-redux";
import {selectUser} from "../../../../features/userSlice";
const Message = forwardRef((props, ref) => {

    const user = useSelector(selectUser);

    return (
        <div ref={ref} className={`message ${user.email === props.contents.email && 'message-sender'}`}>
            <Avatar className="message-photo" src={props.contents.photo}/>
            {props.contents.message === undefined ? (<img className="message-content" src={props.contents.image} alt=""/>) : (<p className="message-content">{props.contents.message}</p>)}
            <small>{new Date(props.contents.timestamp?.toDate()).toLocaleString()}</small>
        </div>
    );
});

export default Message;
