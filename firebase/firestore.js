/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  updateDoc,
  where,
  db,
} from './firebase-config.js';

export { doc, setDoc };

// /* -------------- DATOS DE USUARIO -------------- */
export const userDocRef = (nameDoc, currentUserId) => doc(db, nameDoc, currentUserId);
export const getUserDoc = (docRef) => getDoc(docRef);
export const setUserDoc = (docs, obj) => setDoc(docs, obj);
export const updateUserDoc = (docRef, obj) => updateDoc(docRef, obj);

export const getUsers = () => {
  const q = query(collection(db, 'usuarios'));
  return new Promise((resolve) => {
    onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((docUser) => {
        const objectUser = { };
        objectUser.name = docUser.data().name;
        objectUser.userUID = docUser.id;
        objectUser.photo = docUser.data().photo;
        users.push(objectUser);
      });
      resolve(users);
    });
  });
};
export const getUsersOthers = (uid) => {
  const q = query(collection(db, 'usuarios'), where('userUID', '!=', `${uid}`));
  return new Promise((resolve) => {
    onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((docUser) => {
        const objectUser = { };
        objectUser.name = docUser.data().name;
        objectUser.userUID = docUser.id;
        objectUser.photo = docUser.data().photo;
        users.push(objectUser);
      });
      resolve(users);
    });
  });
};

// /* ------------------  POSTS  --------------------- */
let unsubscribe;

export const readData = (callback) => {
  const q = query(collection(db, 'post'), where('privacity', '==', 'amigos'), orderBy('date', 'desc'));
  unsubscribe = onSnapshot(q, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doct) => {
      const objectPost = { };
      objectPost.content = doct.data().message;
      objectPost.idP = doct.id;
      objectPost.userID = doct.data().userId;
      objectPost.date = doct.data().date;
      objectPost.img = doct.data().img;
      objectPost.type = doct.data().type;
      objectPost.privacity = doct.data().privacity;
      posts.push(objectPost);
    });
    return callback(posts);
    // console.log(posts);
  });
};

export const getDataPostType = (callback, type) => {
  const q = query(collection(db, 'post'), where('privacity', '==', 'amigos'), orderBy('date', 'desc'), where('type', '==', type));
  unsubscribe = onSnapshot(q, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doct) => {
      const objectPost = { };
      objectPost.content = doct.data().message;
      objectPost.idP = doct.id;
      objectPost.userID = doct.data().userId;
      objectPost.date = doct.data().date;
      objectPost.likes = doct.data().likes;
      objectPost.img = doct.data().img;
      objectPost.type = doct.data().type;
      objectPost.privacity = doct.data().privacity;
      posts.push(objectPost);
    });
    console.log(posts);
    return callback(posts);
  });
};
export const getUnsubscribe = () => unsubscribe;

export const savePost = (postDescription, userID, imgULR, Privacity, Type) => addDoc(collection(db, 'post'), {
  message: postDescription.value,
  userId: userID,
  img: imgULR,
  date: Date.now(),
  privacity: Privacity,
  type: Type,
});

export const obtenerInfo = (ID) => {
  const docRef = doc(db, 'usuarios', ID);
  const docSnap = getDoc(docRef);
  return docSnap;
};
export const deletePost = (id) => deleteDoc(doc(db, 'post', id));

export const updatePost = (id, postEdit) => {
  const washingtonRef = doc(db, 'post', id);
  return updateDoc(washingtonRef, {
    message: postEdit,
  });
};

// /* ----------------- LIKES ----------------- */
export const saveLike = (id, userId, userName) => setDoc(doc(db, 'post', id, 'likes', userId), {
  user: userName,
  date: Date.now(),
});

let unsubscribeLikes;
export const readLikes = (callback, id) => {
  const q = query(collection(db, 'post', id, 'likes'), orderBy('date', 'desc'));
  return new Promise((resolve) => {
    unsubscribeLikes = onSnapshot(q, (querySnapshot) => {
      const likes = [];
      querySnapshot.forEach((docC) => {
        const objectLikes = { };
        objectLikes.user = docC.data().user;
        objectLikes.date = docC.data().date;
        likes.push(objectLikes);
      });
      resolve(callback(likes, id));
    });
  });
};
export const getUnsubscribeLikes = () => unsubscribeLikes;

export const deleteLike = (id, userId) => deleteDoc(doc(db, 'post', id, 'likes', userId));

// /* ----------------- COMENTARIOS ----------------- */
export const saveComment = (id, comentario, uid) => addDoc(collection(db, 'post', id, 'comments'), {
  userID: uid,
  message: comentario,
  date: Date.now(),
});

let unsubscribeComments;
export const readComment = (callback, id) => {
  const q = query(collection(db, 'post', id, 'comments'), orderBy('date', 'desc'));
  return new Promise((resolve) => {
    unsubscribeComments = onSnapshot(q, (querySnapshot) => {
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
export const getUnsubscribeComments = () => unsubscribeComments;

// export const countComment = (id) => {
//   const qC = query(collection(db, 'post', id, 'comments'), orderBy('date', 'desc'));
//   return new Promise((resolve, reject) => {
//     onSnapshot(qC, (querySnapshot) => {
//       const commentsOne = [];
//       querySnapshot.forEach((docC) => {
//         commentsOne.push(docC.data());
//       });

//       resolve(commentsOne.length);
//     });
//   });
// };

export const updateComment = (id, idComment, newComment) => {
  const washingtonRef = doc(db, 'post', id, 'comments', idComment);
  return updateDoc(washingtonRef, {
    message: newComment,
  });
};

export const deleteComment = (id, idComment) => deleteDoc(doc(db, 'post', id, 'comments', idComment));

// /* -------------------- PERFIL -------------------- */
let unsubscribePostProfile;
export const leerPostProfile = (callback, uid) => {
  const qP = query(collection(db, 'post'), where('userId', '==', `${uid}`), orderBy('date', 'desc'));
  unsubscribePostProfile = onSnapshot(qP, (querySnapshot) => {
    const postP = [];
    querySnapshot.forEach((doctP) => {
      const objectPostProfile = { };
      objectPostProfile.content = doctP.data().message;
      objectPostProfile.userID = doctP.data().userId;
      objectPostProfile.date = doctP.data().date;
      objectPostProfile.img = doctP.data().img;
      objectPostProfile.postID = doctP.id;
      objectPostProfile.type = doctP.data().type;
      objectPostProfile.privacity = doctP.data().privacity;

      postP.push(objectPostProfile);
    });
    return callback(postP);
    // console.log(postP);
  });
};

export const leerPostProfileFriend = (callback, uid) => {
  const qP = query(collection(db, 'post'), where('userId', '==', `${uid}`), where('privacity', '==', 'amigos'), orderBy('date', 'desc'));
  unsubscribePostProfile = onSnapshot(qP, (querySnapshot) => {
    const postP = [];
    querySnapshot.forEach((doctP) => {
      const objectPostProfile = { };
      objectPostProfile.content = doctP.data().message;
      objectPostProfile.userID = doctP.data().userId;
      objectPostProfile.date = doctP.data().date;
      objectPostProfile.img = doctP.data().img;
      objectPostProfile.postID = doctP.id;
      objectPostProfile.type = doctP.data().type;
      objectPostProfile.privacity = doctP.data().privacity;

      postP.push(objectPostProfile);
    });
    return callback(postP);
    // console.log(postP);
  });
};

export const getUnsubscribePostProfile = () => unsubscribePostProfile;

export const readPostProfile = (uid) => {
  const docRef = doc(db, 'usuarios', uid);
  const docSnap = getDoc(docRef);
  const docUser = docSnap;
  return docUser;
};

export const updateInfoUser = (uid, newAbout, newName, newPhoto, URLportada, newCareer,
  arrayInterest) => {
  const infoUser = doc(db, 'usuarios', uid);
  return updateDoc(infoUser, {
    about: newAbout,
    name: newName,
    photo: newPhoto,
    portada: URLportada,
    career: newCareer,
    interest: arrayInterest,
  });
};
