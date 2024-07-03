import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4yilL6tW3_4TvstIHpTAkqHCCnyZ1-8A",
  authDomain: "my-projects-ccb17.firebaseapp.com",
  projectId: "my-projects-ccb17",
  storageBucket: "my-projects-ccb17.appspot.com",
  messagingSenderId: "1014839463301",
  appId: "1:1014839463301:web:7269104fa33ba835f048ec",
  measurementId: "G-8B6X4BBMNW"
};


const secondaryApp = initializeApp(firebaseConfig, "Secondary");
export const secondaryAuth = getAuth(secondaryApp);
export const db = getFirestore();