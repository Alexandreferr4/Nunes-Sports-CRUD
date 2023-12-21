import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCp2nf0H0Ya-x6SHL7dEFJrFG0REUlSFgc",
  authDomain: "nunes-sports.firebaseapp.com",
  databaseURL: "https://nunes-sports-default-rtdb.firebaseio.com",
  projectId: "nunes-sports",
  storageBucket: "nunes-sports.appspot.com",
  messagingSenderId: "281006547609",
  appId: "1:281006547609:web:348b1ccda9ad4ca0ab4e08",
  measurementId: "G-CGMCBW1CES"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;