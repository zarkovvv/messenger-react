import React, {useEffect, useState} from 'react';
import './Sidebar.scss';
import Header from "./Header/Header";
import Chat from "./Chat/Chat";
import db from "../../firebase";
import {ArrowForwardIos} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import {openSidebar} from "../../functions/functions";

const Sidebar = () => {

    const [chats, setChats] = useState([]);

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
                {chats.map(({id, data: {chatName, owner}}) => (<Chat key={id} id={id} chatName={chatName} owner={owner}/>))}
            </div>
            <IconButton id="arrow" onClick={openSidebar}>
                <ArrowForwardIos />
            </IconButton>
        </div>
    );
};

export default Sidebar;
