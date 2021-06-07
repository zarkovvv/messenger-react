import db, {auth, provider} from "../firebase";
import firebase from "firebase/app";
import {setChat} from "../features/chatSlice";

export const sendMessage = (e, input, setInput, chatId, user) => {
    e.preventDefault();
    if (input !== '') {
        db.collection('chats').doc(chatId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName
        });
        db.collection('chats').doc(chatId).update({timestamp: firebase.firestore.FieldValue.serverTimestamp()});
        setInput('');
    }
};

export const signIn = () => {
    auth.signInWithRedirect(provider).catch((error) => alert(error.message));
}

export async function deleteChat(dispatch, props) {
    await db.collection('chats').doc(props.id).delete();
    dispatch(setChat({
        chatId: null,
        chatName: null
    }));
}

export function setCurrentChat(dispatch, props) {
    dispatch(setChat({chatId: props.id, chatName: props.chatName}));
}

export const createChat = (user) => {

    const chatName = prompt("Please enter chat name:");

    if (chatName){
        db.collection('chats').add({
            chatName: chatName,
            owner: user.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
}

export async function signOut() {
    await auth.signOut();
}

export function closeSidebar(sidebarElement, sidebarHeaderElement, sidebarChatsElement, sidebarArrowElement, sidebarCloseElement) {
    sidebarElement.classList.remove('clicked');
    sidebarHeaderElement.classList.remove('clicked');
    sidebarChatsElement.classList.remove('clicked');
    sidebarArrowElement.classList.remove('clicked');
    sidebarCloseElement.classList.remove('clicked');
}

export function openSidebar(sidebarElement, sidebarHeaderElement, sidebarChatsElement, sidebarArrowElement, sidebarCloseElement) {
    sidebarElement.classList.add('clicked');
    sidebarHeaderElement.classList.add('clicked');
    sidebarChatsElement.classList.add('clicked');
    sidebarArrowElement.classList.add('clicked');
    sidebarCloseElement.classList.add('clicked');
}