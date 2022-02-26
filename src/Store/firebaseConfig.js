import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

export const firebaseConfig = {
    apiKey: "AIzaSyB_f8lc2VDV4YbjCy7KGrlt0AX0dc5HFzQ",
    authDomain: "to-do-15be2.firebaseapp.com",
    projectId: "to-do-15be2",
    storageBucket: "to-do-15be2.appspot.com",
    messagingSenderId: "909729047068",
    appId: "1:909729047068:web:a6b0662b2b7daae485b5d9",
  };

  initializeApp(firebaseConfig);

  export  const db = getFirestore();
  export const auth = getAuth();
  export const provider = new GoogleAuthProvider();