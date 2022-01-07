/* eslint-disable max-len */
import {
  auth,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  // eslint-disable-next-line import/no-unresolved
} from './firebase-config.js';

export const currentUser = () => auth;

/* ----------------------------VISTA CON INICIO DE SESION - AUTH ---------------------------------*/
/* .............SIGNUP.............. */
export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const verificationEmail = () => sendEmailVerification(auth.currentUser);

/* ........LOGIN PROVEEDORES....... */
const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();
const providerGithub = new GithubAuthProvider();

/* ..........LOGIN............ */
export const loginEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const loginGoogle = () => signInWithPopup(auth, providerGoogle);
export const loginFacebook = () => signInWithPopup(auth, providerFacebook);
export const loginGitHub = () => signInWithPopup(auth, providerGithub);

/** ********RESET PASSWORD***** */
export const resetPasswordFirebase = (email) => sendPasswordResetEmail(auth, email);

/** ********SIGN OUT***** */
export const logout = () => signOut(auth);

/** ********CAMBIO DE SESION***** */
export const stateChanged = (callback) => onAuthStateChanged(auth, callback);
