// firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLK7oP3N-wA45O6edIQANmX2_xlYPqW2Q",
  authDomain: "mzilikazi-church.firebaseapp.com",
  projectId: "mzilikazi-church",
  storageBucket: "mzilikazi-church.firebasestorage.app",
  messagingSenderId: "774328366301",
  appId: "1:774328366301:web:cb61aa41284bf4695c1734",
  measurementId: "G-FPHYTGZMY3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth & Providers
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Storage & Firestore
export const storage = getStorage(app);
export const db = getFirestore(app);
