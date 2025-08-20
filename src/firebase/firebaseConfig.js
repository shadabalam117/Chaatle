import firebase from 'firebase/app';
import 'firebase/auth';  // For phone authentication
import 'firebase/firestore';  // For Firestore database

const firebaseConfig = {
      apiKey: "AIzaSyAtH6JKWyHaQUt8yt_VFw_Th83lkyGus4U",
      authDomain: "chaatle-7012b.firebaseapp.com",
      projectId: "chaatle-7012b",
      storageBucket: "chaatle-7012b.firebasestorage.app",
      messagingSenderId: "461251263460",
      appId: "1:461251263460:web:50641c1bba955b1405e5f1",
      measurementId: "G-ZCLJB1VLBP",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();
export default firebaseApp;
