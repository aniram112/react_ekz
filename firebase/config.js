// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAidGdLL1qujLmqP3N4gAHV00C5mr6vYbY",
  authDomain: "chatapp-43110.firebaseapp.com",
  projectId: "chatapp-43110",
  storageBucket: "chatapp-43110.appspot.com",
  messagingSenderId: "877892107194",
  appId: "1:877892107194:web:0d7df9b358c30e6644bb83",
  measurementId: "G-CK1PJME8D4"
};

// Initialize Firebase
// Initialize Firebase
let app;
if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
}else{
  app = firebase.app();
}
const auth = firebase.auth();
const db = getFirestore(app);

export {auth, app, db, getFirestore, doc, setDoc, getDoc};