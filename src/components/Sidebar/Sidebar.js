import React, {useEffect, useState} from 'react';
import './Sidebar.scss';
import Header from "./Header/Header";
import Chat from "./Chat/Chat";
import db from "../../firebase";
import {ArrowForwardIos} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";

const Sidebar = () => {

    const [chats, setChats] = useState([]);
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

    function handleClick() {
        sidebarElement.classList.add('clicked');
        sidebarHeaderElement.classList.add('clicked');
        sidebarChatsElement.classList.add('clicked');
        sidebarArrowElement.classList.add('clicked');
        sidebarCloseElement.classList.add('clicked');
    }

    return (
        <div className="sidebar">
            <Header />
            <div className="sidebar-chats">
                {chats.map(({id, data: {chatName, owner}}) => (<Chat key={id} id={id} chatName={chatName} owner={owner}/>))}
            </div>
            <IconButton id="arrow" onClick={handleClick}>
                <ArrowForwardIos />
            </IconButton>
        </div>
    );
};

export default Sidebar;
