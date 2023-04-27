import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_KEY,
    authDomain: "chatgpt-clone-383807.firebaseapp.com",
    projectId: "chatgpt-clone-383807",
    storageBucket: "chatgpt-clone-383807.appspot.com",
    messagingSenderId: "835345080672",
    appId: "1:835345080672:web:a5cfc4e8b0f11878b93e05",
    measurementId: "G-23T52C6M3Y"
  };
  
  
  
  
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const twitterProvider = new TwitterAuthProvider();

export default app;