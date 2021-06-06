import React from 'react';
import './Main.scss';
import Sidebar from "../Sidebar/Sidebar";
import ChatArea from "../ChatArea/ChatArea";
import {AnimatePresence, motion} from "framer-motion";

const Main = () => {
    return (
        <AnimatePresence>
            <motion.div
                exit={{opacity: 0}}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0}}
            >
        <div className="imessage">
            <Sidebar />
            <ChatArea />
        </div>
        </motion.div>
        </AnimatePresence>
    );
};

export default Main;
