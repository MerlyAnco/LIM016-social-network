/* eslint-disable import/no-unresolved */
import {
  getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-storage.js';

const storage = getStorage();

export const storageRef = (imgUpload) => ref(storage, `img-post/${imgUpload.name}`);
export const uploadBytes1 = (storageRef1, imgUpload) => uploadBytes(storageRef1, imgUpload);
export const storagePhotoProf = (imgUpload) => ref(storage, `img-profile/${imgUpload.name}`);
export const storagePortada = (imgUpload) => ref(storage, `img-profile/${imgUpload.name}`);
export const uploadTask = (storageRef1, imgUpload, metadata) => {
  uploadBytesResumable(storageRef1, imgUpload, metadata);
};
export const getPhotoURL = (task) => getDownloadURL(task);
