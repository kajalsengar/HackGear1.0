
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBdIZ10vec-YKuRlTbjS8JwSaAI7Y-Aoas",
  authDomain: "hack-gear.firebaseapp.com",
  projectId: "hack-gear",
  storageBucket: "hack-gear.firebasestorage.app",
  messagingSenderId: "86847032172",
  appId: "1:86847032172:web:a61d436bc24226d3898149",
  measurementId: "G-P0KF2MY17E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);