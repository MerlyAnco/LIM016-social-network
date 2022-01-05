/* eslint-disable no-plusplus */
import {
  readPostProfile, getUnsubscribe, leerPostProfile, leerPostProfileFriend,
} from '../firebase/firestore.js';

import { profileEdit, FunctionEdit } from './editProfile.js';
import {
  showPostProfile,
} from './templatePostProfile.js';
import { templateUsers } from './templateUsers.js';
import { newPost, functionNewPost } from './newPost.js';

export const Profile = () => {
  // Stop listening to changes
  document.getElementById('container').innerHTML = '';
  const profile = document.createElement('div');
  profile.classList.add('container-profile');
  profile.innerHTML = `
  <!-- <button id="home">Home</button> -->

  <section class="header-profile">
    <div class='container-portada'>
      <img id="frontPageProfile" width="100px"> 
      <button id='goEdit'>Edit Profile</button>
    </div>
    
    <div class="container-info">
      <img id="photoUserProfile" width="100px">
      <div class="info-profile">
        <div id="infoUserProfile"></div>
        <p id="career"></p>
        <p id="aboutP"></p>
        <div id="div-etiquetaMobile">
        </div>
        <ul class="container-follower">
          <li class="follower">
            <p class="li-number">1.2 M</p>
            <p class="li-description">Followers</p>
          </li>
          <li class="follow">
            <p class="li-number">98</p>
            <p class="li-description">Follows</p>
          </li>
          <li class="posts-li">
            <p class="li-number">250</p>
            <p class="li-description">Posts</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
  <section id="section-infoUser">
    <div id="section-User" class=" fullUser">
      <div class="info-user-full">
      <div id="sectionDescription">
        <h1>Description</h1>
        <div id="infoDescription">
          <p id="ocupation"></p>
          <p id="about"></p>
          <div id="div-etiqueta">
          </div>
        </div>
      </div>
      <div id="divParent-users">
      <h1>Queen Coders Users</h1>
      <div id="sectionUsers" >
      </div>
      </div>
      </div>
    </div>
    <section id="post-section" class="container-postProfile">
      <button id="btn-newPost" style="display:none"> Add New Post </button>
      <div id="PostProfile"></div>
    </section>
  </section>

  <section class="modalEditProfile" style="display:none">
    <div class="modalDiv-editProf">
    <div class="modalContainer-edit">
    </div>
    </div>
  </section>
  <section class="modalNewPost" style="display: none">
      <div class="modalDivPost">
      <div class="modalContainer-NewPost">
      </div>
      </div>
  </section>
    `;

  return document.querySelector('#container').appendChild(profile);
};

export const FunctionProfile = () => {
  const idUserRedirect = window.localStorage.getItem('idUserRedirecionar');
  console.log(idUserRedirect);
  const userCurrent = JSON.parse(localStorage.getItem('user'));
  console.log(userCurrent);
  if (idUserRedirect === userCurrent.uid) {
    leerPostProfile(showPostProfile, idUserRedirect);

    document.getElementById('goEdit').style.display = 'block';
    // document.querySelector('.modalDelete').classList.remove('revelar');
  } else {
    document.getElementById('goEdit').style.display = 'none';
    leerPostProfileFriend(showPostProfile, idUserRedirect);
  }
  // const userID = userCurrent.uid;
  templateUsers();

  readPostProfile(idUserRedirect).then((docUser) => {
    document.getElementById('photoUserProfile').src = `${docUser.data().photo}`;
    document.getElementById('frontPageProfile').src = `${docUser.data().portada}`;
    const info = document.getElementById('infoUserProfile');
    info.innerHTML = `${docUser.data().name}`;
    const career = document.getElementById('career');
    career.innerHTML = `${docUser.data().career}`;
    const aboutParrafo = document.getElementById('aboutP');
    aboutParrafo.innerHTML = `${docUser.data().about}`;
    console.log('Current data: ', docUser.data());
    console.log(docUser.data().interest);
    document.getElementById('ocupation').innerHTML = `${docUser.data().career}`;
    document.getElementById('about').innerHTML = `${docUser.data().about}`;
    for (let i = 0; i < docUser.data().interest.length; i++) {
      const pEtiqueta = document.createElement('p');
      pEtiqueta.classList.add('etiqueta');
      pEtiqueta.innerHTML = `${docUser.data().interest[i]}`;
      document.getElementById('div-etiqueta').appendChild(pEtiqueta);
    }
    for (let i = 0; i < docUser.data().interest.length; i += 1) {
      const pEtiqueta = document.createElement('p');
      pEtiqueta.classList.add('etiqueta');
      pEtiqueta.innerHTML = `${docUser.data().interest[i]}`;
      document.getElementById('div-etiquetaMobile').appendChild(pEtiqueta);
    }
  });

  document.getElementById('goEdit').addEventListener('click', () => {
    profileEdit();
    document.querySelector('.modalEditProfile').style.display = 'flex';
    FunctionEdit();
    document.getElementById('container-footer').style.display = 'none';
  });

  // Crear nuevo post
  document.getElementById('btn-newPost').addEventListener('click', () => {
    newPost();
    document.querySelector('.modalNewPost').style.display = 'flex';
    functionNewPost();
  });
  document.getElementById('btn-post-mobile').addEventListener('click', () => {
    newPost();
    document.querySelector('.modalNewPost').style.display = 'flex';
    functionNewPost();
  });

  getUnsubscribe();
};

// export const showPostProfile = () => {
//   document.getElementById('goEdit').addEventListener('click', () => {
//     profileEdit();
//     document.querySelector('.modalNewPost').style.display = 'flex';
//     FunctionEdit();
//   });
// };
