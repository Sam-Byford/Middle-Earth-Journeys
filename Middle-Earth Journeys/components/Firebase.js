import * as firebase from 'firebase';
import '@firebase/firestore';

const config = {
  apiKey: "AIzaSyBoZz6QS3oXSqgMOAcHQSFCeH4d3ADpEm0",
  authDomain: "middleearthjournies.firebaseapp.com",
  projectId: "middleearthjournies",
  storageBucket: "middleearthjournies.appspot.com",
  messagingSenderId: "273266875407",
  appId: "1:273266875407:web:32bef283e9cf5c70a8977a",
  measurementId: "G-LMRPGFYK1K"
};

firebase.initializeApp(config);

export default firebase;