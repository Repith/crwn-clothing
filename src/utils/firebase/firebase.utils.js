import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

//getting doc and data from it via getDoc and setting it by setDoc
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwBK6FA-l_dUhj_aHCbwZfU979fOs1qr0",
  authDomain: "crwn-clothing-db-8f36b.firebaseapp.com",
  projectId: "crwn-clothing-db-8f36b",
  storageBucket: "crwn-clothing-db-8f36b.appspot.com",
  messagingSenderId: "291087097607",
  appId: "1:291087097607:web:48c4909d0c12f496c1afa2",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
};
