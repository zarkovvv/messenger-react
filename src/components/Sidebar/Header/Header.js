import React from 'react';
import './Header.scss';
import {Avatar, IconButton} from "@material-ui/core";
import {Close, RateReviewOutlined, Search} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {selectUser} from "../../../features/userSlice";
import db, {auth} from "../../../firebase";
import firebase from "firebase/app";

const Header = () => {

    const sidebarElement = document.getElementsByClassName('sidebar')[0];
    const sidebarHeaderElement = document.getElementsByClassName('sidebar-header')[0];
    const sidebarChatsElement = document.getElementsByClassName('sidebar-chats')[0];
    const sidebarArrowElement = document.getElementById('arrow');
    const sidebarCloseElement = document.getElementById('close');


    const user = useSelector(selectUser);

    const createChat = () => {

        const chatName = prompt("Please enter chat name:");

        if (chatName){
            db.collection('chats').add({
                chatName: chatName,
                owner: user.email,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
    }

    async function signOut() {
       await auth.signOut();
    }

    function closeSidebar() {
        sidebarElement.classList.remove('clicked');
        sidebarHeaderElement.classList.remove('clicked');
        sidebarChatsElement.classList.remove('clicked');
        sidebarArrowElement.classList.remove('clicked');
        sidebarCloseElement.classList.remove('clicked');
    }

    return (
        <div className="sidebar-header">

            <Avatar src={user.photo} className="sidebar-avatar" onClick={signOut} />

            <div className="sidebar-input">
                <Search />
                <input type="text" placeholder="Search"/>
            </div>

            <IconButton variant="outlined"  onClick={createChat}>
                <RateReviewOutlined className="create-chat"/>
            </IconButton>
            <IconButton id="close" onClick={closeSidebar}>
                <Close />
            </IconButton>

        </div>
    );
};

export default Header;
