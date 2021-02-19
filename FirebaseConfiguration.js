import firebase from "firebase/app";
import "firebase/storage";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAq8gN6Oer87Bj7UUIpvYFdZG-DQKg-oVA",
  authDomain: "reactnativesavindu.firebaseapp.com",
  projectId: "reactnativesavindu",
  storageBucket: "reactnativesavindu.appspot.com",
  messagingSenderId: "125093579108",
  appId: "1:125093579108:web:901568f3b78f33467a1271",
  measurementId: "G-BVV8XW3BVN",
};
firebase.initializeApp(config);

const storage = firebase.storage();

export { storage, firebase as default };
