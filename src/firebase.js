// firebase.js

import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Firestoreをインポート

const firebaseConfig = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_DOMEIN,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID,
    // apiKey: "AIzaSyBAcR-4vNz8Dd8CNn3B0MPZc4syNL2Ini0",
    // authDomain: "vue-subscriptions-90c2d.firebaseapp.com",
    // projectId: "vue-subscriptions-90c2d",
    // storageBucket: "vue-subscriptions-90c2d.appspot.com",
    // messagingSenderId: "836595713960",
    // appId: "1:836595713960:web:900f63233e1b7e13bf3f9d"
};

const apps = getApps();
const firebaseApp = !apps.length ? initializeApp(firebaseConfig) : apps[0];
const firebaseAuth = getAuth(firebaseApp);
const firebaseDb = getFirestore(firebaseApp); // Firestoreを初期化

const getCurrentUser = () => new Promise((resolve) => {
    const unsub = onAuthStateChanged(firebaseAuth, user => {
        unsub();
        resolve(user);
    });
});

export { firebaseApp, firebaseAuth, firebaseDb, getCurrentUser };



