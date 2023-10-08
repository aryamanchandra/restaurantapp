import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyART4-qPIkbopTY67ZMXqp91-l-2CXUobQ",
  authDomain: "restaurant-app-d275c.firebaseapp.com",
  projectId: "restaurant-app-d275c",
  storageBucket: "restaurant-app-d275c.appspot.com",
  messagingSenderId: "12180113149",
  appId: "1:12180113149:web:0aa5428d54e54520a26094"
};

let app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };