import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCSkDu17AzhIv0UgMahWiciNx9Dx8l1FFE",
  authDomain: "prueba-auth-5dde1.firebaseapp.com",
  projectId: "prueba-auth-5dde1",
  storageBucket: "prueba-auth-5dde1.firebasestorage.app",
  messagingSenderId: "329793553534",
  appId: "1:329793553534:web:f8f2efd61a0c5b75bec42f",
  measurementId: "G-ZV617Y9KDH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const provider = new GoogleAuthProvider();
const auth = getAuth();

export function crearUsuario(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      console.log("Credenciales: ", userCredential);
      const user = userCredential.user;
      console.log("Usuario: ", user);
      // ...
    })
    .catch((error) => {
      console.log("Error al crear usuario: ", error.code, error.message);
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

export function loginEmailPass(email, password) {
  return new Promise((res, rej) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log("Credenciales: ", userCredential);
        const user = userCredential.user;
        console.log("Usuario: ", user);
        res(user);
      })
      .catch((error) => {
        console.log("Error al crear usuario: ", error.code, error.message);
        const errorCode = error.code;
        const errorMessage = error.message;
        rej(error);
      });
  });
}
