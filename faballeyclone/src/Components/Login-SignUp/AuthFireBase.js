// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA78Bxp7VVImjRaVz0yn17djlOavlA2Sis",
  authDomain: "faballey-85796.firebaseapp.com",
  projectId: "faballey-85796",
  storageBucket: "faballey-85796.appspot.com",
  messagingSenderId: "1067944361532",
  appId: "1:1067944361532:web:3af930bfb58239b74b8d39",
  measurementId: "G-V415WJ8EXN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const webAuth = getAuth(app);