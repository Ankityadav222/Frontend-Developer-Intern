// firebase.js
import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "./lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Save user to Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
    }, { merge: true });

    return user;
  } catch (error) {
    console.error("Google Sign-in Error:", error);
    throw error;
  }
};