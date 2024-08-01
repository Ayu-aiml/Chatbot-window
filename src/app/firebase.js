import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVmWeq5LiDbcAAoDb9JyID1XDZ98sk-lw",
  authDomain: "chatbot-demo-123.firebaseapp.com",
  projectId: "chatbot-demo-123",
  storageBucket: "chatbot-demo-123.appspot.com",
  messagingSenderId: "1067309827602",
  appId: "1:1067309827602:web:cc736ede8a0afeaee43acb"
};

/**const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => signInWithPopup(auth, provider);
const logOut = () => signOut(auth);

export { auth, signInWithGoogle, logOut };**/

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

const signOutUser = () => {
  return signOut(auth);
};

const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export { auth, signInWithGoogle, signOutUser, onAuthStateChangedListener };