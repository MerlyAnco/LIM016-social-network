import { storageRef, uploadTask, getPhotoURL /* uploadBytes1, */ } from '../firebase/firebase-storage.js';

export const getImage = (imgUpload, cb) => {
  const metadata = { content: imgUpload.type };
  console.log(imgUpload);

  const storageRef1 = storageRef(imgUpload);
  const task = uploadTask(storageRef1, imgUpload, metadata);

  task.on('state_changed', (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(`Upload is ${progress}% done`);
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
      default:
        break;
    }
  },
  (error) => {
    console.log(error);
  },
  (() => {
    getPhotoURL(task.snapshot.ref).then((downloadURL) => {
      cb(downloadURL);
    });
  }));
};

// export const getImage = (imgUpload) => {
//   const storageRef1 = storageRef(imgUpload);

//   // 'file' comes from the Blob or File API
//   uploadBytes1(storageRef1, imgUpload).then((snapshot) => {
//     console.log('Uploaded a blob or file!');
//     console.log(snapshot);
//   });
// };
