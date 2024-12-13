// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { signInWithEmailAndPassword, initializeAuth, getReactNativePersistence, 
    createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfIKjvwRS3R8ysp1TFoo1J0KvzXDRcfB8",
  authDomain: "helloapp-102f7.firebaseapp.com",
  projectId: "helloapp-102f7",
  storageBucket: "helloapp-102f7.firebasestorage.app",
  messagingSenderId: "572475404390",
  appId: "1:572475404390:web:c23d9457aa5732f3d4bda7",
  measurementId: "G-L5GNRP7W0H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
//const auth = getAuth(app);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export {app, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut};