// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtkFKdmP3Ryhf8KYyN1Kg4Qtaw2PxXRvM",
  authDomain: "assaingment12-fb290.firebaseapp.com",
  projectId: "assaingment12-fb290",
  storageBucket: "assaingment12-fb290.appspot.com",
  messagingSenderId: "475577039972",
  appId: "1:475577039972:web:6d306b9a655d6a522f7371",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
