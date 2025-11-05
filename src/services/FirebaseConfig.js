import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyChe1D-Djm1lpXVB7rQF7Poh13GsdTNAaI",
  authDomain: "controle-financeiro-ef039.firebaseapp.com",
  projectId: "controle-financeiro-ef039",
  storageBucket: "controle-financeiro-ef039.firebasestorage.app",
  messagingSenderId: "974731590725",
  appId: "1:974731590725:web:d88779f0fe6e260811372c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);