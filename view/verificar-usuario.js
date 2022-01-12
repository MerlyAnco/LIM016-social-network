import { userDocRef, getUserDoc, setUserDoc } from '../firebase/firestore.js';

import { currentUser, stateChanged } from '../firebase/firebase-auth.js';

// let user = JSON.parse(localStorage.getItem('user'));

export const verificarUsuario = async function verificarSiExisteUsuario() {
  const userCurrent = currentUser().currentUser;
  const userID = userCurrent.uid;
  const nameUser = userCurrent.displayName;
  const docRef = userDocRef('usuarios', userID);
  const docSnap = await getUserDoc(docRef);

  if (docSnap.exists()) {
    console.log('existe');
  } else if (nameUser === null) {
    const nameNew = JSON.parse(localStorage.getItem('name'));
    if (nameNew) {
      await setUserDoc(docRef, {
        name: nameNew,
        photo:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMcsPTHZ91k7dc7VsbRYTe7M5KHLtydC2M0iQUzNh2YG-C_6kBkroerXsVVW9c_CpYmVU&usqp=CAU',
        userUID: userID,
        about: 'Write a phrase that describes you!',
        portada:
          'https://media.istockphoto.com/vectors/the-future-is-female-vector-illustration-stylish-print-for-t-shirts-vector-id1206930173',
        career: 'Tell us what do you do',
        interest: ['html', 'css', 'javascript'],
      });
    } else {
      await setUserDoc(docRef, {
        name: 'Developer',
        photo:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMcsPTHZ91k7dc7VsbRYTe7M5KHLtydC2M0iQUzNh2YG-C_6kBkroerXsVVW9c_CpYmVU&usqp=CAU',
        userUID: userID,
        about: 'Write a phrase that describes you!',
        portada:
          'https://static-cse.canva.com/blob/706582/1600w-dzsSYIjyvws.jpg',
        career: 'Tell us what do you do',
        interest: ['html', 'css', 'javascript'],
      });
    }
  } else {
    await setUserDoc(docRef, {
      name: nameUser,
      photo: userCurrent.photoURL,
      userUID: userCurrent.uid,
      about: 'Write a phrase that describes you!',
      portada: 'https://static-cse.canva.com/blob/706582/1600w-dzsSYIjyvws.jpg',
      career: 'Tell us what do you do',
      interest: ['html', 'css', 'javascript'],
    });
    console.log('No existe');
  }
  return userCurrent;
};

// export const stateChanged1 = stateChanged((userOne) => {
//   if (userOne) {
//     user = userOne;
//     const verificar = userOne.emailVerified;
//     if (verificar) {
//       window.location.hash = '#/home';
//     }
//   } else {
//     user = '';
//     window.location.hash = '#/';
//   }
// });

export const stateChanged1 = () => {
  stateChanged((user) => {
    if (user === null || user === undefined) window.location.hash = '#/login';
  });
};
