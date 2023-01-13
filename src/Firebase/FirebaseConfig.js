import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore, Timestamp, serverTimestamp } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID
};


const fbApp = (getApps.length > 0) ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(fbApp);
const storage = getStorage(fbApp);
const fbAuth = getAuth(fbApp);



export { fbApp, fbAuth, onAuthStateChanged, firestore, storage, Timestamp, serverTimestamp };