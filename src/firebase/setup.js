import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCC3SJkZ3sBDqdMEiS34ki0V_hxzb9Jdt0",
  authDomain: "newsitrone-c2632.firebaseapp.com",
  projectId: "newsitrone-c2632",
  storageBucket: "newsitrone-c2632.appspot.com",
  messagingSenderId: "454723682346",
  appId: "1:454723682346:web:8693496cc730c3ebf70353"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app) 
export const googleProvider = new GoogleAuthProvider(app) 
export const database = getFirestore()
