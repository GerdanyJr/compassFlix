import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBDdc-h_Hp4xLeRju9rInmYHI9kfSWJJwc",
  authDomain: "compass-flix.firebaseapp.com",
  projectId: "compass-flix",
  storageBucket: "compass-flix.appspot.com",
  messagingSenderId: "384733747178",
  appId: "1:384733747178:web:ea062ae8e85caf29a08493",
  databaseURL: "https://compass-flix-default-rtdb.firebaseio.com/",
  measurementId: "G-K10CGZN4V4"
};

export const app = initializeApp(firebaseConfig);