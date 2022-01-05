/* eslint-disable no-plusplus */
import {
  readData,
  userDocRef,
  getUserDoc,
  updateUserDoc,
  getUnsubscribe,
  getUnsubscribeComments,
  getUnsubscribeLikes,
  getUnsubscribePostProfile,
  getDataPostType,
} from '../firebase/firestore.js';

import { template } from './templatePost.js';
import { logout } from '../firebase/firebase-auth.js';
import { templateUsers } from './templateUsers.js';
// eslint-disable-next-line import/named
import { newPost, functionNewPost } from './newPost.js';

export const Home = () => {
  const divElement = document.createElement('div');
  divElement.classList.add('container-home');
  divElement.innerHTML = `
  <div class="section-home">
    <div id="section-User">
      <div class="container-info-users">
      <div id="infoUserHome">
        <div class='header-home'>
          <img id="photoUser" class="photoHome" width="100px">
          <div class="header-text">
            <h>Hello,</h>
            <p id="infoUser"></p>
          </div>
        </div>
      </div>

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
        <h1>Other users</h1>
        <div id="sectionUsers"></div>
      </div>
    </div>
  </div>

  <div class="div-showPost">
    <button id="btn-newPost" style="display:none"> Add new post </button>
    <div id="showPost"></div>
  </div>

  <div class="sectionTypes">
    <div class="container-info-users">
      <div id="header-categories">
        <p>Categories</p>
        <p id="todos">See All</p>
      </div>

      <div id="botones-types">
        <div class="div-type">
          <img class="img-types" src="./img/ofertaLaboral.jpg">
          <button value="Job Offer" id="Job Offer" class="btn-type">Job Offer</button>
        </div>
        <div class="div-type">
          <img class="img-types" src="./img/evento.jpg">
          <button value="Event" id="Event"  class="btn-type">Events</button>
        </div>
        <div class="div-type">
          <img class="img-types" src="./img/cursos.jpg">
          <button value="Courses" id="Courses" class="btn-type">Courses</button>
        </div>
        <div class="div-type">
          <img class="img-types" src="./img/tutorial.jpg">
          <button value="Tutorial" id="Tutorial" class="btn-type">Tutorials</button>
        </div>
        <div class="div-type">
          <img class="img-types" src="./img/preguntas.jpg">
          <button value="Question" id="Question" class="btn-type">Questions</button>
        </div>
      </div>
    </div>
  </div>

  <section class="modalNewPost" style="display: none">
      <div class="modalDivPost">
        <div class="modalContainer-NewPost"></div>
      </div>
  </section>

  <section class="modalDelete" style="display: none">
    <div class="modalDivDelete">
      <div class="modalContainer-Delete">
        <div id="closeDelete">
          <i class="far fa-times-circle"></i>
        </div>
        <div>
          <h1>Eliminar publicación</h1>
          <div class="modal-parrafo">
            ¿Estás seguro que quieres eliminar esta publicación de <b class="emailText">Queen Coders</b> para siempre?
          </div>
          <button class="aceptDelete">ELIMINAR</button>
        </div>
      </div>
    </div>
  </section>
  `;
  return document.querySelector('#container').appendChild(divElement);
};
export const FunctionsHome = () => {
  templateUsers();
  // autentificando usuario logueado
  const userCurrent = JSON.parse(localStorage.getItem('user'));
  console.log(userCurrent);
  // const userCurrent = currentUser().currentUser;
  const userID = userCurrent.uid;
  async function profileInfo() {
    const docRef = userDocRef('usuarios', userID);
    const docSnap = await getUserDoc(docRef);
    if (docSnap.exists()) {
      const userInfo = docSnap.data();
      if (userInfo.name == null) {
        await updateUserDoc(docRef, {
          name: 'Developer',
        });
      }
      const info = document.getElementById('infoUser');
      info.innerHTML = `${userInfo.name}`;
      document.getElementById('photoUser').src = `${userInfo.photo}`;
      console.log(userInfo.interest);
      document.getElementById('ocupation').innerHTML = `${userInfo.career}`;
      document.getElementById('about').innerHTML = `${userInfo.about}`;
      for (let i = 0; i < userInfo.interest.length; i++) {
        const pEtiqueta = document.createElement('p');
        pEtiqueta.classList.add('etiqueta');
        pEtiqueta.innerHTML = `${userInfo.interest[i]}`;
        document.getElementById('div-etiqueta').appendChild(pEtiqueta);
      }
    }
    console.log(docSnap.data());
  }

  document.querySelector('#botones-types').addEventListener('click', (e) => {
    const type = e.target.value;
    getDataPostType(template, type);
    document.getElementById(`${type}`).classList.add('activeCategory');

    document.querySelector('.sectionTypes').addEventListener('click', (a) => {
      const tipoP2 = a.target.getAttribute('id');
      if (type !== tipoP2) {
        document.getElementById(`${type}`).classList.remove('activeCategory');
      }
    });
  });

  profileInfo();

  readData(template);

  document.getElementById('todos').addEventListener('click', () => {
    readData(template);
  });
  // LogOut
  window.addEventListener('click', (e) => {
    const btnOut = e.target.id;
    if (btnOut === 'out') {
      logout()
        .then(() => {
          getUnsubscribe();
          getUnsubscribeComments();
          getUnsubscribeLikes();
          console.log('log out');
          window.location.hash = '#/';
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (btnOut === 'logout-mob') {
      logout()
        .then(() => {
          getUnsubscribe();
          getUnsubscribeComments();
          getUnsubscribeLikes();
          console.log('log out');
          window.location.hash = '#/';
        })
        .catch((error) => {
          console.log(error);
        });
    }
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

  // Ocultar modal delete
  document.querySelector('#closeDelete').addEventListener('click', () => {
    document.querySelector('.modalDelete').classList.remove('revelar');
  });

  getUnsubscribePostProfile();
};
