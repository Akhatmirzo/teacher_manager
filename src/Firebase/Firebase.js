// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4yilL6tW3_4TvstIHpTAkqHCCnyZ1-8A",
  authDomain: "my-projects-ccb17.firebaseapp.com",
  projectId: "my-projects-ccb17",
  storageBucket: "my-projects-ccb17.appspot.com",
  messagingSenderId: "1014839463301",
  appId: "1:1014839463301:web:7269104fa33ba835f048ec",
  measurementId: "G-8B6X4BBMNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);

export { app };
