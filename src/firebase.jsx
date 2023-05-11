import "firebase/compat/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4-RKjKPBfoke2qZUFYhg-_pW2sSblMcs",
  authDomain: "netflix-clone-8af9f.firebaseapp.com",
  projectId: "netflix-clone-8af9f",
  storageBucket: "netflix-clone-8af9f.appspot.com",
  messagingSenderId: "519157297377",
  appId: "1:519157297377:web:919bb31182020492e9c7a0",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export default auth;
