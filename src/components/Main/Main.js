import React from 'react';
import './Main.scss';
import Sidebar from "../Sidebar/Sidebar";
import ChatArea from "../ChatArea/ChatArea";

const Main = () => {
    return (
        <div className="imessage">
            <Sidebar />
            <ChatArea />
        </div>
    );
};

export default Main;
