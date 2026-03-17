import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDhgAi4YnCDAxdwwDj6U3gfMkUx8UcMhqA",
    authDomain: "your-vote-matters-376120.firebaseapp.com",
    projectId: "your-vote-matters-376120",
    storageBucket: "your-vote-matters-376120.appspot.com",
    messagingSenderId: "564195074189",
    appId: "1:564195074189:web:46c15019d218ff430342c4",
    measurementId: "G-M37K112RGV"
  };
  
  const app = initializeApp(firebaseConfig);
  export const db = getDatabase(app);