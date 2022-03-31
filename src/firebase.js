//firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {  
    // firebase 설정과 관련된 개인 정보
  apiKey: "AIzaSyCMnM0tHmnU1xo9CGDZzLZtoC0efP4rewo",
  authDomain: "isabel-react-basic.firebaseapp.com",
  projectId: "isabel-react-basic",
  storageBucket: "isabel-react-basic.appspot.com",
  messagingSenderId: "1038371191115",
  appId: "1:1038371191115:web:30eada6cc616d0ccdb90ce",
  measurementId: "G-TQNZ2ZKYRD"
};

// firebaseConfig 정보로 firebase 시작
// Initialize Firebase
initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);

export const db = getFirestore();