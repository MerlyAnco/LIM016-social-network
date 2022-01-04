const auth = {
  currentUser: {
    uid: 'fake-user-id',
  },
};

const resetPasswordFirebase = jest.fn(() => Promise.resolve());

const createUser = jest.fn(() => Promise.resolve({
  userCredential: {
    emailVerified: true,
  },
}));

const verificationEmail = jest.fn(() => Promise.resolve({
  userCredential: {
    user: {
      emailVerified: true,
    },
  },
}));

// export const loginEmail = jest.fn(() => Promise.resolve({
//   user: {
//     emailVerified: true,
//   },
// }));
// export const loginGoogle = () => Promise.resolve();
// export const loginFacebook = () => Promise.resolve();
// export const loginGitHub = () => Promise.resolve();
// export const currentUser = () => ({
//   currentUser: {
//     uid: '',
//     displayName: '',
//   },
// });

export {
  auth,
  resetPasswordFirebase,
  createUser,
  verificationEmail,
};

// export const auth = {
//   currentUser: {
//     uid: 'fake-user-id',
//   },
// };
// export const setDoc = jest.fn((document, values) => Promise.resolve(values));
// export const doc = jest.fn((db, collection, docId) => Promise.resolve({}));
// export const db = {};

// eslint-disable-next-line max-len
// export const signInWithEmailAndPassword = jest.fn((auth, email, password) => Promise.resolve({}));

// export const loginEmail = jest.fn(() => Promise.resolve(
//   {
//     userCredential: {
//       user: {
//         emailVerified: true,
//       },
//     },
//   },
// ));
// export {
//   auth,
//   resetPasswordFirebase,
//   // signInWithEmailAndPassword,
// };
