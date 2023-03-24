// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBXwnu0Z6Nrs49k9fRdci2HmYVI97qC-8k",
	authDomain: "whatsapp-clone-s7r.firebaseapp.com",
	projectId: "whatsapp-clone-s7r",
	storageBucket: "whatsapp-clone-s7r.appspot.com",
	messagingSenderId: "490603281188",
	appId: "1:490603281188:web:5e86bff381a04f1bbb51b1",
	measurementId: "G-344C3R5F0H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
