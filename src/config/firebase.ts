import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

let firebaseApp: FirebaseApp;

if(!firebaseApp) {
    firebaseApp = initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASSE_APP_ID,
    });
}

export default firebaseApp;

export const auth = getAuth();