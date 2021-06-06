import React from "react";
import './App.scss';
import {useDispatch, useSelector} from "react-redux";
import {selectUser, login, logout, selectLoading} from "./features/userSlice";
import Main from "./components/Main/Main";
import Login from "./components/Login/Login";
import {useEffect} from "react";
import {auth} from "./firebase";
import Loader from "./components/Loader/Loader";

function App() {

    const user = useSelector(selectUser);
    const loading = useSelector(selectLoading);
    const dispatch = useDispatch();

    useEffect( () => {
        setTimeout( () => {
        auth.onAuthStateChanged(authUser => {
            if (authUser) {
                dispatch(login({
                    uid: authUser.uid,
                    photo: authUser.photoURL,
                    email: authUser.email,
                    displayName: authUser.displayName
                }));
            } else {
                dispatch(logout());
            }
        })}, 1000);
    }, [dispatch]);

    if (loading) {
        return (<Loader />)
    } else {
        return (
            <div className='app'>
                {user ? (<Main />) : (<Login />)}
            </div>
        );

    }
}

export default App;
