// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC50vQRHgfhadsfq_0eutwedm_wgbZYMOQ",
  authDomain: "signal-clone-d750f.firebaseapp.com",
  projectId: "signal-clone-d750f",
  storageBucket: "signal-clone-d750f.appspot.com",
  messagingSenderId: "570354861751",
  appId: "1:570354861751:web:96cc3da3bffe299f5aef32"
};



// if(firebaseConfig.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// }
// else {
//   app = firebase.app();
// }

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {
  auth,
  db
}