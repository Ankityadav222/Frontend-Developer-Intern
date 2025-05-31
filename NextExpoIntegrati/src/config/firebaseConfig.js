import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDSXB14L4VkTKrx2CRlSX2Zc0cVSuDvy5w",
  authDomain: "nextexpoapp-c07d6.firebaseapp.com",
  projectId: "nextexpoapp-c07d6",
  storageBucket: "nextexpoapp-c07d6.appspot.com",
  messagingSenderId: "687059014274",
  appId: "1:687059014274:web:6da0d2afc39053fff59a9b",
  measurementId: "G-T960NT4E3H",
};

// Initialize Firebase only if it hasn't been initialized already
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export default app;