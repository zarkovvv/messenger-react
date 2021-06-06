import React from 'react';
import './Loader.scss';
import {AnimatePresence, motion} from "framer-motion";

const Loader = () => {
    return (
        <AnimatePresence>
        <motion.div
            exit={{opacity: 0}}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0}}
        >
            <div className="price-app">
                <div className="loader">
                    <div className="inner one"/>
                    <div className="inner two"/>
                    <div className="inner three"/>
                </div>
            </div>
        </motion.div>
        </AnimatePresence>
    );
};

export default Loader;
