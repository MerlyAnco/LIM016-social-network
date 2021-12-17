import {
  obtenerInfo, readPostProfile, leerPostProfile, getUnsubscribe,
} from '../firebase/firestore.js';

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
      <a id='goEdit' href="#/home/profile/editProfile">Edit Profile</a>
    </div>
    <div class="container-info">
      <img id="photoUserProfile" width="100px">
      <div class="info-profile">
        <div id="infoUserProfile"></div>
        <p id="career"></p>
        <p id="aboutP"></p>
        <ul class="container-follower">
          <li class="follower">
            <p class="li-number">1.2 M</p>
            <p class="li-description">Seguidores</p>
          </li>
          <li class="follow">
            <p class="li-number">98</p>
            <p class="li-description">Seguidos</p>
          </li>
          <li class="posts-li">
            <p class="li-number">250</p>
            <p class="li-description">Posts</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
  <div id="infoUserProfile"></div>
  <p id="aboutP"></p>
  
    <h1> MY POST</h1>
    <div id="PostProfile"></div>
    `;

  return document.querySelector('#container').appendChild(profile);
};
export const FunctionProfile = () => {
  const userCurrent = JSON.parse(localStorage.getItem('user'));
  const userID = userCurrent.uid;

  readPostProfile(userID).then((docUser) => {
    document.getElementById('photoUserProfile').src = `${docUser.data().photo}`;
    document.getElementById('frontPageProfile').src = `${docUser.data().portada}`;
    const info = document.getElementById('infoUserProfile');
    info.innerHTML = `${docUser.data().name}`;
    const career = document.getElementById('career');
    career.innerHTML = `${docUser.data().career}`;
    const aboutParrafo = document.getElementById('aboutP');
    aboutParrafo.innerHTML = `${docUser.data().about}`;
    console.log('Current data: ', docUser.data());
  });

  function showPostProfile(post) {
    const PostProfile = document.getElementById('PostProfile');
    const nuevoElemento = document.createElement('div');

    post.forEach(async (onePost) => {
      const dataUser = await obtenerInfo(onePost.userID);
      nuevoElemento.innerHTML += `<div class="postDiv">
      <div>${dataUser.data().name}</div>
      <div>${onePost.content}</div>
      <div>`;
    });
    PostProfile.appendChild(nuevoElemento);
  }

  leerPostProfile(showPostProfile, userID);

  const unsb = getUnsubscribe();
  unsb();
};
