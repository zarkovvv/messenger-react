import React, {useEffect, useState} from 'react';
import './Sidebar.scss';
import Header from "./Header/Header";
import Chat from "./Chat/Chat";
import db from "../../firebase";

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

    console.log(chats);

    return (
        <div className="sidebar">
            <Header />
            <div className="sidebar-chats">
                {chats.map(({id, data: {chatName}}) => (<Chat key={id} id={id} chatName={chatName}/>))}
            </div>
        </div>
    );
};

export default Sidebar;
