// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH1w2cmaVw0bl_wynfjjQS0BQ3RIZepOk",
  authDomain: "complaint-report-13bd6.firebaseapp.com",
  projectId: "complaint-report-13bd6",
  storageBucket: "complaint-report-13bd6.appspot.com",
  messagingSenderId: "315735680051",
  appId: "1:315735680051:web:598c0861c52e8314086f46",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
