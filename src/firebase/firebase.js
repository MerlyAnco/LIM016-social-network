/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-analytics.js';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  updateDoc,
  where,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';

import {
  getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-storage.js';

import {
  getAuth,
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
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyD9ngpw2YVZK0ZTgYEn2L3kJX2HFlcDK8Q',
  authDomain: 'social-network-268a8.firebaseapp.com',
  databaseURL: 'https://social-network-268a8-default-rtdb.firebaseio.com',
  projectId: 'social-network-268a8',
  storageBucket: 'social-network-268a8.appspot.com',
  messagingSenderId: '564158720663',
  appId: '1:564158720663:web:0349103b12e24b0fe697d2',
  measurementId: 'G-VP2LPBCJD7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
const auth = getAuth();
// const user = auth.currentUser;
const storage = getStorage();

/* ----------------------------VISTA CON INICIO DE SESION - AUTH ---------------------------------*/
export const currentUser = () => auth;
/* **********SIGNUP********** */
export const createUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password);
};
export const verificationEmail = () => sendEmailVerification(auth.currentUser);

/* *****LOGIN PROVEEDORES***** */
const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();
const providerGithub = new GithubAuthProvider();

/* **********LOGIN********** */
export const loginEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const loginGoogle = () => signInWithPopup(auth, providerGoogle);
export const loginFacebook = () => signInWithPopup(auth, providerFacebook);
export const loginGitHub = () => signInWithPopup(auth, providerGithub);

/* ******RESET PASSWORD****** */
export const resetPasswordFirebase = (email) => sendPasswordResetEmail(auth, email);

/* ******VERIFICAR EMAIL****** */
export const emailVerify = () => sendEmailVerification(auth.currentUser);

/* *****CAMBIO DE SESION***** */
export const stateChanged = (callback) => onAuthStateChanged(auth, callback);

/* *********LOG OUT********* */
export const logout = () => signOut(auth);

/* ----------------FUNCIONES RELACIONADAS A FIRESTORE ------------------- */

export const deletePost = (id) => deleteDoc(doc(db, 'post', id));

export const updatePost = (id, postEdit) => {
  const washingtonRef = doc(db, 'post', id);
  return updateDoc(washingtonRef, {
    message: postEdit,
  });
};

export const obtenerInfo = (ID) => {
  const docRef = doc(db, 'usuarios', ID);
  const docSnap = getDoc(docRef);
  return docSnap;
};

export const updateLikePost = (id, people) => {
  const postRef = doc(db, 'post', id);
  return updateDoc(postRef, {
    likes: [{
      users: people,
    }],
  });
};

export const savePost = (postDescription, userID, imgULR) => {
  const docRef = addDoc(collection(db, 'post'), {
    message: postDescription.value,
    userId: userID,
    img: imgULR,
    likes: [{
      users: [],
    }],
    date: Date.now(),
  });
  console.log('Document written with ID: ', docRef);
};

export const readData = (callback) => {
  const q = query(collection(db, 'post'), orderBy('date', 'desc'));
  onSnapshot(q, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doct) => {
      const objectPost = { };
      objectPost.content = doct.data().message;
      objectPost.idP = doct.id;
      objectPost.userID = doct.data().userId;
      objectPost.date = doct.data().date;
      objectPost.likes = doct.data().likes;
      objectPost.img = doct.data().img;
      posts.push(objectPost);
      return posts;
    });
    callback(posts);
  });
};

export const leerPostProfile = (callback, uid) => {
  getDocs(query(collection(db, 'post'), where('userId', '==', `${uid}`))).then((resultado) => {
    const postP = [];
    resultado.forEach((doctP) => {
      const objectPostProfile = { };
      objectPostProfile.content = doctP.data().message;
      objectPostProfile.userID = doctP.data().userId;
      postP.push(objectPostProfile);
      return postP;
    });
    callback(postP);
    console.log(postP);
  });
};

export const readPostProfile = (uid) => {
  const docRef = doc(db, 'usuarios', uid);
  const docSnap = getDoc(docRef);
  const docUser = docSnap;
  return docUser;
};

export const updateInfoUser = (uid, newAbout, newName, newPhoto, URLportada, newCareer) => {
  const infoUser = doc(db, 'usuarios', uid);
  return updateDoc(infoUser, {
    about: newAbout,
    name: newName,
    photo: newPhoto,
    portada: URLportada,
    career: newCareer,
  });
};

export const saveComment = (id, comentario, uid) => {
  addDoc(collection(db, 'post', id, 'comments'), {
    userID: uid,
    message: comentario,
    date: Date.now(),
  });
};

export const readComment = (callback, id) => {
  const q = query(collection(db, 'post', id, 'comments'), orderBy('date', 'desc'));
  return new Promise((resolve, reject) => {
    onSnapshot(q, (querySnapshot) => {
      const comments = [];
      querySnapshot.forEach((docC) => {
        const objectComment = { };
        objectComment.content = docC.data().message;
        objectComment.userID = docC.data().userID;
        objectComment.ID = docC.id;
        comments.push(objectComment);
      });
      resolve(callback(comments, id));
    });
  });
};

export const countComment = (id) => {
  const qC = query(collection(db, 'post', id, 'comments'), orderBy('date', 'desc'));
  return new Promise((resolve, reject) => {
    onSnapshot(qC, (querySnapshot) => {
      const commentsOne = [];
      querySnapshot.forEach((docC) => {
        commentsOne.push(docC.data());
      });

      resolve(commentsOne.length);
    });
  });
};

export const updateComment = (id, idComment, newComment) => {
  const washingtonRef = doc(db, 'post', id, 'comments', idComment);
  return updateDoc(washingtonRef, {
    message: newComment,
  });
};

export const deleteComment = (id, idComment) => {
  deleteDoc(doc(db, 'post', id, 'comments', idComment));
};

/* ---------------------------FUNCIONES RELACIONADAS A STORAGE----------------------------------*/

export const storageRef = (imgUpload) => ref(storage, `img-post/${imgUpload.name}`);

export const uploadBytes1 = (storageRef1, imgUpload) => uploadBytes(storageRef1, imgUpload);

export const storagePhotoProf = (imgUpload) => ref(storage, `img-profile/${imgUpload.name}`);

export const storagePortada = (imgUpload) => ref(storage, `img-profile/${imgUpload.name}`);

// eslint-disable-next-line max-len
export const uploadTask = (storageRef1, imgUpload, metadata) => uploadBytesResumable(storageRef1, imgUpload, metadata);

export const getPhotoURL = (task) => getDownloadURL(task);

/* ....ALMACENAR DATOS DE USUARIO.... */
const userDocRef = (nameDoc, currentUserId) => doc(db, nameDoc, currentUserId);
const getUserDoc = (docRef) => getDoc(docRef);
const setUserDoc = (docs, obj) => setDoc(docs, obj);
const updateUserDoc = (docRef, obj) => updateDoc(docRef, obj);

export {
  userDocRef,
  getUserDoc,
  setUserDoc,
  updateUserDoc,
};