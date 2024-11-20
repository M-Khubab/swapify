// firebase.js

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNRta5umyBXxs5TkSLKU4yPR2zaIcFHgc",
  authDomain: "swapify-4c1f7.firebaseapp.com",
  projectId: "swapify-4c1f7",
  storageBucket: "swapify-4c1f7.appspot.com",
  messagingSenderId: "1051692989445",
  appId: "1:1051692989445:web:95f3f8f75fdcbbd116b06c",
  measurementId: "G-J76B6R7TSD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Google Sign-In function
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Reference to Firestore document
    const userDocRef = doc(db, "users", user.uid);

    // Check if the user document exists
    const docSnap = await getDoc(userDocRef);
    if (!docSnap.exists()) {
      // If the document does not exist, set new user data
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
      });
    }
    
    return user;
  } catch (error) {
    console.error("Error during Google Sign-In:", error);
    throw error;
  }
};

// Function to get user data from Firestore
const getUserData = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Listen for authentication state changes
const monitorAuthState = (callback) => {
  onAuthStateChanged(auth, callback);
};

// Export Firebase services and functions
export { db, storage, auth, signInWithGoogle, monitorAuthState, getUserData };
