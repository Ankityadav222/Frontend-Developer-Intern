// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDSXB14L4VkTKrx2CRlSX2Zc0cVSuDvy5w",
  authDomain: "nextexpoapp-c07d6.firebaseapp.com",
  projectId: "nextexpoapp-c07d6",
  storageBucket: "nextexpoapp-c07d6.appspot.com",
  messagingSenderId: "687059014274",
  appId: "1:687059014274:web:6da0d2afc39053fff59a9b",
  measurementId: "G-T960NT4E3H",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Only initialize messaging on client-side
let messaging = null;
if (typeof window !== 'undefined') {
  // Check if messaging is supported before initializing
  isSupported().then((supported) => {
    if (supported) {
      messaging = getMessaging(app);
    }
  });
}

export { auth, provider, db, messaging };