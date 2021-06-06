import React from 'react';
import './Loader.scss';
import {AnimatePresence, motion} from "framer-motion";

const Loader2 = () => {
    return (
        <AnimatePresence>
            <motion.div
                exit={{opacity: 0}}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0}}
            >
                <div className="holder">
                    <div className="preloader">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Loader2;
