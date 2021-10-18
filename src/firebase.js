import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBjAoPJ57W3YxsLMXB83lgp3bw_WSH40-o",
  authDomain: "journal-4dcd9.firebaseapp.com",
  projectId: "journal-4dcd9",
  storageBucket: "journal-4dcd9.appspot.com",
  messagingSenderId: "1081666310482",
  appId: "1:1081666310482:web:262fe514c683a0767baa8b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
