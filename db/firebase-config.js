import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import * as firebase from 'firebase/app'
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyC4t3LmWj-BR6BNtQmtmDKJR0EwdYmFVVQ",
    authDomain: "coderhouse-react-63c43.firebaseapp.com",
    projectId: "coderhouse-react-63c43",
    storageBucket: "coderhouse-react-63c43.appspot.com",
    messagingSenderId: "447582767917",
    appId: "1:447582767917:web:10e4a0eae9234fde6be1a4"
  });

const db = getFirestore(app);
export default db;

export {app, db}