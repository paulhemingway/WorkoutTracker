import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA_fi9PvaLHLQCA5Sb-FZYoS_XJBntUF1g",
  authDomain: "workouts-b904e.firebaseapp.com",
  projectId: "workouts-b904e",
  storageBucket: "workouts-b904e.appspot.com",
  messagingSenderId: "175725425707",
  appId: "1:175725425707:web:daaf2c39c3db827a83e66e",
  measurementId: "G-LE30GKDEW3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore()