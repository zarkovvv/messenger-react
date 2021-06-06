import React from 'react';
import './Login.scss';
import {Button} from "@material-ui/core";
import {ReactComponent as LoginLogo} from '../../static/images/chat-svgrepo-com.svg';
import {auth, provider} from "../../firebase";
import {AnimatePresence, motion} from "framer-motion";

const Login = () => {

    const signIn = () => {
        auth.signInWithPopup(provider).catch((error) => alert(error.message));
    }

    return (
        <AnimatePresence>
            <motion.div
                exit={{opacity: 0}}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0}}
            >
        <div className="login">
            <div className="login-logo">
                <LoginLogo />
                <h1>Messenger</h1>
            </div>
            <Button onClick={signIn} className="login-button">
                Sign in
            </Button>
        </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Login;
