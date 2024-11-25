// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbIVX7Dx_QK9-nslgKAhOeeBF4Ie1xr0M",
  authDomain: "my-project-db32e.firebaseapp.com",
  databaseURL: "https://my-project-db32e-default-rtdb.firebaseio.com",
  projectId: "my-project-db32e",
  storageBucket: "my-project-db32e.firebasestorage.app",
  messagingSenderId: "489109693809",
  appId: "1:489109693809:web:8322d9c7da60e27cd482d0",
  measurementId: "G-GK5KD59K92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);


export const provider = new GoogleAuthProvider();