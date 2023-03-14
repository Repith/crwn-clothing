import { initializeApp } from "firebase/app";

import {
  signOut,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

//getting doc and data from it via getDoc and setting it by setDoc
import {
  doc,
  query,
  getDoc,
  setDoc,
  getDocs,
  collection,
  writeBatch,
  getFirestore,
} from "firebase/firestore";

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

//Initializing providers (Google in this application)
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

//Setting the authorisation, an sign in methods
export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

//Getting db from Firestore
export const db = getFirestore();

//Creating a collection of objects in Firebase
export const addCollectionAndDocument = async (
  collectionKey,
  objectsToAdd,
  field
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

//Basic authentication pattern:
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  if (!userAuth) return;

  //creates a snapshot of the user in db and looks up for the user
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  //if snapshot doesn't matches the user
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    //setting the new user via setDoc in Firestore
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log("Error creating the user", err.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth);

//Authentication listner
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

//NEED TO RETHINK THE LOGIC OF THIS FUNCTION
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
