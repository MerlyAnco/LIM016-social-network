/* eslint-disable prefer-const */
/* eslint-disable max-len */
import {
  storagePhotoProf,
  uploadTask,
  getPhotoURL,
} from '../firebase/firebase-storage.js';

import {
  obtenerInfo, updateInfoUser,
} from '../firebase/firestore.js';

export const profileEdit = () => {
  const editProfile = document.createElement('form');
  editProfile.classList.add('form-editProfile');
  editProfile.innerHTML = `
    <div class="header-editProfile">
      <h1>Edit Profile</h1>
      <div id="closeEdit">
        <i class="far fa-times-circle"></i>
      </div>
    </div>

    <div class="container-infoEdit">

      <div class="container-editPhoto">
        <img id="photoUserEdit" width="100px">
        <label for="edit-file"><i class="fas fa-edit"></i></label>
        <input type="file" id="edit-file" name="edit-file" multiple/>
      </div>

      <div class="container-editPortada">
        <img id="portadaUserEdit" width="100px">
        <label for="edit-portada"><i class="fas fa-edit"></i></label>
        <input type="file" id="edit-portada" name="edit-portada" multiple/>
      </div>

    <div class="form-group">
    <ion-icon name="person-outline"></ion-icon>
    <label for="edit-name">Edita tu Nombre</label>
    <input type="text" id="edit-name" name="edit-name"  placeholder="Name" >
    </div>
    <div class="form-group">
    <ion-icon name="briefcase-outline"></ion-icon>
    <label for="edit-career">Edita tu Ocupación</label>
    <input type="text" id="edit-career"  name="edit-career" placeholder="Ocupation" >
    </div>
    <div class="form-group">
    <label for="edit-about">Edita tu about</label>
    <textarea  id="edit-about" name="edit-about" row="3" placeholder="¡Cuentanos más sobre ti, o escribe una frase que te describe!" ></textarea>
    </div>
    <div class="form-group icons-programming">
      <label for="edit-about">Edita tus intereses <span>(máx 6 items)</span></label>
      <div class="img-programming">
        <div class="interest-programming">
        <img class="img-prog" src="./img/html.png" name="html" title="Html">
        </div>
        <div class="interest-programming">
        <img class="img-prog" src="./img/css.png" name="css" title="CSS">
        </div>
        <div class="interest-programming">
        <img class="img-prog" src="./img/js.png" name="javascript" title="Javascript">
        </div>
        <div class="interest-programming">
        <img class="img-prog" src="./img/react.png" name="react" title="React">
        </div>
        <div class="interest-programming">
        <img class="img-prog" src="./img/vue.png" name="vue" title="Vue">
        </div>
        <div class="interest-programming">
        <img class="img-prog" src="./img/java.png" name="java" title="Java">
        </div>
        <div class="interest-programming">
        <img class="img-prog" src="./img/php.png" name="php" title="PHP">
        </div>
        <div class="interest-programming">
        <img class="img-prog" src="./img/python.png" name="python" title="Python">
        </div>
        <div class="interest-programming">
        <img class="img-prog" src="./img/cpp.png" name="c++" title="C++">
        </div>
        <div class="interest-programming">
        <img class="img-prog" src="./img/docker.png" name="docker" title="Docker">
        </div>
        <div class="interest-programming">
        <img class="img-prog" src="./img/jest.png" name="jest" title="Jest">
        </div>
        <div class="interest-programming">
        <img class="img-prog" src="./img/node.png" name="node" title="Node js">
        </div>
        <div class="interest-programming">
        <img class="img-prog" src="./img/typescript.png" name="typescript" title="Typescript">
        </div>
        <div class="interest-programming">
        <img class="img-prog" src="./img/gopher.png" name="gopher" title="Go Gopher">
        </div>
      </div>
    </div>
    <div class="btns-editProfile">
    <input type="reset" id="resetForm" value="Borrar"/>
    <button id="btn-edit">Save</button>
    </div>
    </div>
    `;
  return document.querySelector('.modalContainer-edit').appendChild(editProfile);
};

export const FunctionEdit = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);

  const newName = document.getElementById('edit-name');
  const newAbout = document.getElementById('edit-about');
  const newPhoto = document.getElementById('photoUserEdit');
  const newPortada = document.getElementById('portadaUserEdit');
  const newCareer = document.getElementById('edit-career');
  const arrayInterest = [];
  console.log(arrayInterest);

  const arrayImg = document.querySelectorAll('.img-prog');
  arrayImg.forEach((interest) => {
    console.log(interest);
    interest.addEventListener('click', () => {
      console.log(interest);
      const icoProgramming = interest.name;
      if (arrayInterest.length < 6) {
        if (arrayInterest.includes(icoProgramming)) {
          console.log('ya eligio este');
          arrayInterest.splice(arrayInterest.indexOf(icoProgramming), 1);
          console.log(arrayInterest);
          interest.classList.remove('activeProgramming');
        } else {
          arrayInterest.push(icoProgramming);
          console.log(arrayInterest);
          interest.classList.add('activeProgramming');
        }
      } else if (arrayInterest.includes(icoProgramming)) {
        console.log('ya eligio este');
        arrayInterest.splice(arrayInterest.indexOf(icoProgramming), 1);
        console.log(arrayInterest);
        interest.classList.remove('activeProgramming');
      }
    });
  });

  (() => {
    obtenerInfo(user.uid).then((userInfo) => {
      console.log(userInfo.data());
      newPhoto.src = `${userInfo.data().photo}`;
      newPortada.src = `${userInfo.data().portada}`;
      newName.value = `${userInfo.data().name}`;
      newAbout.value = `${userInfo.data().about}`;
      newCareer.value = `${userInfo.data().career}`;
      const array1 = userInfo.data().interest;
      array1.forEach((e) => {
        arrayInterest.push(e);
        arrayImg.forEach((interest) => {
          if (interest.getAttribute('name') === e) {
            interest.classList.add('activeProgramming');
          }
        });
      });
    });
  })();

  // GUARDANDO NUEVA INFORMACION

  // ........................foto de portada.....................

  const fileEditPortada = document.getElementById('edit-portada');
  let filesPortada = [];
  const readerEditPortada = new FileReader();

  fileEditPortada.onchange = (a) => {
    filesPortada = a.target.files;
    // const extention = GetFileExt(files[0]);
    // const name = GetFileName(files[0]);

    readerEditPortada.readAsDataURL(filesPortada[0]);
    // uploadImg(files);
  };
  readerEditPortada.onload = function () {
    console.log(readerEditPortada);
    newPortada.src = readerEditPortada.result;
  };

  if (fileEditPortada.files[0]) {
    const imgUploadPortada = filesPortada[0];
    const metadata1 = { content: imgUploadPortada.type };
    console.log(imgUploadPortada);

    const storageRef2 = storagePhotoProf(imgUploadPortada);
    const task1 = uploadTask(storageRef2, imgUploadPortada, metadata1);

    task1.on('state_changed', (snapshot) => {
      const progress1 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress1}% done`);
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
        default:
          console.log('holi');
          break;
      }
    },
    (error) => {
      console.log(error);
    },
    (() => {
    // eslint-disable-next-line max-len
      getPhotoURL(task1.snapshot.ref).then((downloadURL) => {
      // eslint-disable-next-line max-len
        newPortada.src = downloadURL;
      });
    }));
  }

  // ........................ foto de perfil..........................
  const fileEdit = document.getElementById('edit-file');
  let files = [];
  const readerEdit = new FileReader();

  fileEdit.onchange = (e) => {
    files = e.target.files;
    // const extention = GetFileExt(files[0]);
    // const name = GetFileName(files[0]);

    readerEdit.readAsDataURL(files[0]);
    // uploadImg(files);
  };
  readerEdit.onload = function () {
    console.log(readerEdit);
    newPhoto.src = readerEdit.result;
  };

  if (fileEdit.files[0]) {
    const imgUpload = files[0];
    const metadata = { content: imgUpload.type };
    console.log(imgUpload);

    const storageRef1 = storagePhotoProf(imgUpload);
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
          console.log('holi');
          break;
      }
    },
    (error) => {
      console.log(error);
    },
    (() => {
    // eslint-disable-next-line max-len
      getPhotoURL(task.snapshot.ref).then((downloadURL) => {
      // eslint-disable-next-line max-len
        newPhoto.src = downloadURL;
      });
    }));
  }
  // Reset
  document.querySelector('#resetForm').addEventListener('click', () => {
    document.querySelector('.form-editProfile').reset();
  });

  // GUARDANDO NUEVA INFORMACION

  document.getElementById('btn-edit').addEventListener('click', (e) => {
    e.preventDefault();
    // eslint-disable-next-line max-len
    if (fileEdit.files[0]) {
      updateInfoUser(user.uid, newAbout.value, newName.value, newPhoto.src, newPortada.src, newCareer.value, arrayInterest)
        .then(() => {
          window.location.reload();
        });
    } else {
    // eslint-disable-next-line max-len
      updateInfoUser(user.uid, newAbout.value, newName.value, newPhoto.src, newPortada.src, newCareer.value, arrayInterest)
        .then(() => {
          window.location.reload();
        });
    }
  });

  document.getElementById('closeEdit').addEventListener('click', () => {
    document.querySelector('.modalEditProfile').style.display = 'none';
    document.querySelector('.form-editProfile').remove();
    document.getElementById('container-footer').style.display = 'flex';
  });
};
