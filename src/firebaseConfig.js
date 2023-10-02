// src/firebaseConfig.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBXEnag0JVlFZBxg7DgukXxCbna0LI3jvA",
    authDomain: "zero-login-24eea.firebaseapp.com",
    projectId: "zero-login-24eea",
    storageBucket: "zero-login-24eea.appspot.com",
    messagingSenderId: "263251464499",
    appId: "1:263251464499:web:650c996d5397f69ff4ee46"
};
const firebase = initializeApp(firebaseConfig);

export default firebase;