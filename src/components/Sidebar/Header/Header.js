import React from 'react';
import './Header.scss';
import {Avatar, IconButton} from "@material-ui/core";
import {Close, RateReviewOutlined, Search} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {selectUser} from "../../../features/userSlice";
import {closeSidebar, createChat, signOut} from "../../../functions/functions";

const Header = () => {

    const user = useSelector(selectUser);

    const sidebarElement = document.getElementsByClassName('sidebar')[0];
    const sidebarHeaderElement = document.getElementsByClassName('sidebar-header')[0];
    const sidebarChatsElement = document.getElementsByClassName('sidebar-chats')[0];
    const sidebarArrowElement = document.getElementById('arrow');
    const sidebarCloseElement = document.getElementById('close');

    return (
        <div className="sidebar-header">

            <Avatar src={user.photo} className="sidebar-avatar" onClick={signOut} />

            <div className="sidebar-input">
                <Search />
                <input type="text" placeholder="Search"/>
            </div>

            <IconButton variant="outlined"  onClick={() => createChat(user)}>
                <RateReviewOutlined className="create-chat"/>
            </IconButton>

            <IconButton id="close" onClick={() => closeSidebar(sidebarElement, sidebarHeaderElement, sidebarChatsElement, sidebarArrowElement, sidebarCloseElement)}>
                <Close />
            </IconButton>

        </div>
    );
};

export default Header;
