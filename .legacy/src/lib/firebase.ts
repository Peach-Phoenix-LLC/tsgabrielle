import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDOR-XF_8rMrl3qZE8Y7gYYU2JMCJ9dhjQ",
    authDomain: "tsgabrielle-49555100-b2f30.firebaseapp.com",
    projectId: "tsgabrielle-49555100-b2f30",
    storageBucket: "tsgabrielle-49555100-b2f30.firebasestorage.app",
    messagingSenderId: "434814386675",
    appId: "1:434814386675:web:d30d509d30b01fd5941286"
};

// Initialize Firebase for Next.js (avoiding multiple initializations)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export { app };
