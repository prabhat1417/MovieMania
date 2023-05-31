import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyD0rO7ioNUP0wIEq6luT6xtzm7kwk1cV-8",
    authDomain: "netflix-clone-b7c5b.firebaseapp.com",
    projectId: "netflix-clone-b7c5b",
    storageBucket: "netflix-clone-b7c5b.appspot.com",
    messagingSenderId: "955381996516",
    appId: "1:955381996516:web:7e61427464f9c4a30ac5f1"
  };

  const firebaseApp = firebase.initializeApp (firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {auth};
  export default db; 