import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAIgzMceOrdz-tfOo7bfKsdiGz_ZEH6BRM",
  authDomain: "projecthub-960e2.firebaseapp.com",
  projectId: "projecthub-960e2",
  storageBucket: "projecthub-960e2.firebasestorage.app",
  messagingSenderId: "830943778072",
  appId: "1:830943778072:web:2d886ded0f8b1b85357a6d",
  measurementId: "G-GVQFZ4CM70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
