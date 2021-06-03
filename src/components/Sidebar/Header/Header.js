import React from 'react';
import './Header.scss';
import {Avatar, IconButton} from "@material-ui/core";
import {RateReviewOutlined, Search} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {selectUser} from "../../../features/userSlice";
import db, {auth} from "../../../firebase";

const Header = () => {

    const user = useSelector(selectUser);

    const createChat = () => {

        const chatName = prompt("Please enter chat name:");

        if (chatName){
            db.collection('chats').add({
                chatName: chatName
            });
        }
    }

    return (
        <div className="sidebar-header">

            <Avatar src={user.photo} className="sidebar-avatar" onClick={() => auth.signOut()}/>

            <div className="sidebar-input">
                <Search />
                <input type="text" placeholder="Search"/>
            </div>

            <IconButton variant="outlined" className="create-chat" onClick={createChat}>
                <RateReviewOutlined />
            </IconButton>

        </div>
    );
};

export default Header;
