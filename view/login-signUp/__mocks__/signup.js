export const createUser = jest.fn(() => Promise.resolve({
  userCredential: {
    email: 'fake-email',
    password: 'pwd',
    emailVerified: true,
  },
}));

// (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const verificationEmail = jest.fn(() => Promise.resolve({
  currentUser: {
    uid: 'fake-user-id',
  },
}));

// () => sendEmailVerification(auth.currentUser);