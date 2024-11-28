import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDE52lcwjzaAN_xNiUG6v3uTLwGzO_qRoo',
  authDomain: 'smart-home-7b5f3.firebaseapp.com',
  databaseURL: 'https://smart-home-7b5f3-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'smart-home-7b5f3',
  storageBucket: 'smart-home-7b5f3.firebasestorage.app',
  messagingSenderId: '165252389344',
  appId: '1:165252389344:web:d3601f068d9231f922f385',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app)

export { database }
