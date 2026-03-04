// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA__ZvPgVd_lEBsieJlcJ0u2ktVKVdVuXs",
  authDomain: "zerodha-clone-auth.firebaseapp.com",
  projectId: "zerodha-clone-auth",
  storageBucket: "zerodha-clone-auth.firebasestorage.app",
  messagingSenderId: "601696259188",
  appId: "1:601696259188:web:3ea6539c62ea01e6c71521",
  measurementId: "G-L0GHDZ5JDG"
};

const app = initializeApp(firebaseConfig);

// ✅ IMPORTANT EXPORT
export const auth = getAuth(app);