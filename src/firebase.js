// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDL4yFEpicFI0GiOlQwF433gqjWxFCo_6o',
  authDomain: 'ideen-actividad.firebaseapp.com',
  projectId: 'ideen-actividad',
  storageBucket: 'ideen-actividad.appspot.com',
  messagingSenderId: '270624903401',
  appId: '1:270624903401:web:97ea202e9abfa06f2fe078'
}

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(FirebaseApp)
export const db = getFirestore(FirebaseApp)
export const storage = getStorage(FirebaseApp)
