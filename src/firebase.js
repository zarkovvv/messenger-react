import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCX66NmOgGEEuakRlevqrxKRrM3ugC98PU",
    authDomain: "react-messenger-f2666.firebaseapp.com",
    projectId: "react-messenger-f2666",
    storageBucket: "react-messenger-f2666.appspot.com",
    messagingSenderId: "446651251470",
    appId: "1:446651251470:web:a32ddf1950e0e4a466b55f",
    measurementId: "G-5VEDVQW4ZH"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;