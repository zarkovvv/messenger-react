import React, {useEffect, useState} from 'react';
import './Sidebar.scss';
import Header from "./Header/Header";
import Chat from "./Chat/Chat";
import db from "../../firebase";
import {ArrowForwardIos} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import {openSidebar} from "../../functions/functions";
import {useSelector} from "react-redux";
import {selectChatId} from "../../features/chatSlice";

const Sidebar = () => {

    const [chats, setChats] = useState([]);
    const currentChatId = useSelector(selectChatId);

    const sidebarElement = document.getElementsByClassName('sidebar')[0];
    const sidebarHeaderElement = document.getElementsByClassName('sidebar-header')[0];
    const sidebarChatsElement = document.getElementsByClassName('sidebar-chats')[0];
    const sidebarArrowElement = document.getElementById('arrow');
    const sidebarCloseElement = document.getElementById('close');

    useEffect(() => {
        db.collection('chats').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })));
        });
    }, []);

    return (
        <div className="sidebar">
            <Header />
            <div className="sidebar-chats">
                {chats.map(({id, data: {chatName, owner}}) => (<Chat key={id} id={id} chatName={chatName} owner={owner} current={currentChatId === id}/>))}
            </div>
            <IconButton id="arrow" onClick={() => openSidebar(sidebarElement, sidebarHeaderElement, sidebarChatsElement, sidebarArrowElement, sidebarCloseElement)}>
                <ArrowForwardIos />
            </IconButton>
        </div>
    );
};

export default Sidebar;
