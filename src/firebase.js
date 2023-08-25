// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0oruP3D4UZepi8WOvosLytuh5pkRrhBM",
  authDomain: "podcast-app-react-81232.firebaseapp.com",
  projectId: "podcast-app-react-81232",
  storageBucket: "podcast-app-react-81232.appspot.com",
  messagingSenderId: "723918908632",
  appId: "1:723918908632:web:6370c0a1d986d60b5c3bad",
  measurementId: "G-2C1MV0QZ4X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };