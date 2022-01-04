export const navMobile = () => {
  const userCurrent = JSON.parse(localStorage.getItem('user'));
  console.log(userCurrent);
  const viewNavMobile = document.createElement('nav');
  viewNavMobile.classList.add('nav-mobile');
  viewNavMobile.innerHTML = `
    <ul class="menu">
      <li><a class="btnHome1" href="#/home"><i class="fas fa-home"></i></a></li>
      <li><a href="#/home"><i id="btn-search" class="fas fa-bell"></i></a></li>
      <li><span class = "btn-newPost-mobile"><i id="btn-post-mobile" class="fas fa-plus-circle"></i></span></li>
      <li><a class="btnProfile1" href="#/home/profile/${userCurrent.uid}"><i class="fas fa-user-circle" id="myID" data-id="${userCurrent.uid}"></i></a></li>
      <li><i id="logout-mob" class="fas fa-sign-out-alt"></i></li>
    </ul>
    `;

  viewNavMobile.querySelector('#myID').addEventListener('click', (e) => {
    const idUser = e.target.dataset.id;
    localStorage.setItem('idUserRedirecionar', idUser); // almacenar el id del usuario a redireccionar
    window.location.href = `#/home/profile/${idUser}`;
  });

  return viewNavMobile;
};

export const functionNavMobile = () => {
  if (window.location.hash === '#/home') {
    document.querySelector('.btnHome1').classList.add('active');
  } else if (window.location.hash.includes('#/home/profile')) {
    document.querySelector('.btnProfile1').classList.add('active');
  }
};

// export const navChangeView = () => {
//   const btnNabMobile = document.querySelector('.nav-mobile');
//   btnNabMobile.addEventListener('click', (e) => {
//     const btnNav = e.target.id;
//     if (btnNav === 'btn-home') {
//       window.location.hash = '#/home';
//     } else if (btnNav === 'btn-profile') {
//       window.location.hash = '#/home/profile';
//     }
//     // else if (btnNav === 'btn-search') {
//     //   window.location.hash = '#/editProfile';
//     // }
//   });
// };
