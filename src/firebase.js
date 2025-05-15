import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCLK7oP3N-wA45O6edIQANmX2_xlYPqW2Q",
  authDomain: "mzilikazi-church.firebaseapp.com",
  projectId: "mzilikazi-church",
  storageBucket: "mzilikazi-church.appspot.com",
  messagingSenderId: "774328366301",
  appId: "1:774328366301:web:cb61aa41284bf4695c1734",
  measurementId: "G-FPHYTGZMY3"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const getUserAdminStatus = async (uid) => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() && userSnap.data().isAdmin;
};

export {
  auth,
  db,
  storage,
  getUserAdminStatus,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  doc,
  getDoc,
  collection,
  addDoc,
  ref,
  uploadBytes,
  getDownloadURL,
};
