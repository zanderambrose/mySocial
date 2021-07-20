import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD2eJc6A_UApRkJrnS8zxxrfYWpURZgX6g",
  authDomain: "project-1-2e348.firebaseapp.com",
  projectId: "project-1-2e348",
  storageBucket: "project-1-2e348.appspot.com",
  messagingSenderId: "38442013938",
  appId: "1:38442013938:web:aa4d49746a09ed9b7aec6b",
  measurementId: "G-NEG58378Z3"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage(); 

export {db, auth, storage}; 