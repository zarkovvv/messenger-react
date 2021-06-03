import React from 'react';
import './Login.scss';
import {Button} from "@material-ui/core";
import {ReactComponent as LoginLogo} from '../../static/images/chat-svgrepo-com.svg';
import {auth, provider} from "../../firebase";

const Login = () => {

    const signIn = () => {
        auth.signInWithPopup(provider).catch((error) => alert(error.message));
    }

    return (
        <div className="login">
            <div className="login-logo">
                <LoginLogo />
                <h1>Messenger</h1>
            </div>
            <Button onClick={signIn} className="login-button">
                Sign in
            </Button>
        </div>
    );
};

export default Login;
