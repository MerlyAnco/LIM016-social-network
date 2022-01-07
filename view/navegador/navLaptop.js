import { getUsers } from '../../firebase/firestore.js';

export const navLaptop = () => {
  const userCurrent = JSON.parse(localStorage.getItem('user'));
  console.log(userCurrent);
  const viewNavLaptop = document.createElement('nav');
  viewNavLaptop.classList.add('nav-full');
  viewNavLaptop.innerHTML = `
    <div class="divLogo">
      <i class="fas fa-crown"></i>
      <p class="logo-full-screen"><a class="logo-full-screen" href="#/home"> Queen Coders </a> </p>
    </div>
    
    <div class="container-search">
        <input type="text" class="search" id="search" name="search" placeholder="Search for people, tag, ..." autocomplete="off">
    <div class="container-result-search" >
        <ul class="result-search" id="result-search" style="display:none"></ul>
    </div>        
    </div>

    <ul class="menuFull">
      <li><a class="btnHome" href="#/home"><i class="fas fa-home" title="Home"></i></a></li>
      <li><a  class="btnProfile" href="#/home/profile/${userCurrent.uid}"  title="Profile"><i class="fas fa-user-circle" id="myID" data-id="${userCurrent.uid}"></i></a></li>
      <li><i id="out" class="fas fa-sign-out-alt"  title="Log Out"></i></li>
    </ul>
    `;

  const inputSearch = viewNavLaptop.querySelector('#search');
  const resultSearch = viewNavLaptop.querySelector('#result-search');

  // console.log(dataUsers);

  inputSearch.addEventListener('keyup', () => {
    const search = inputSearch.value.toLowerCase();
    console.log(search);
    const searchUsers = (data) => {
      const arrayUsers = data.filter((user) => user.name.toLowerCase().includes(search));
      const resultHtml = arrayUsers.map(
        (user) => `
      <li id="${user.userUID}" class="li-user"><span>${user.name}</span></li>`,
      );

      if (search === '' || arrayUsers.length === 0) {
        document.querySelector('.result-search').style.display = 'none';
        resultSearch.innerHTML = '';
      } else {
        resultSearch.innerHTML = resultHtml.join('');
        document.querySelector('.result-search').style.display = 'block';
        viewNavLaptop.querySelectorAll('.li-user').forEach((list) => {
          list.addEventListener('click', () => {
            const idList = list.id;
            console.log(idList);
            localStorage.setItem('idUserRedirecionar', idList); // almacenar el id del usuario a redireccionar
            window.location.href = `#/home/profile/${idList}`;
          });
        });
      }
    };
    getUsers().then((data) => searchUsers(data));
  });

  viewNavLaptop.querySelector('#myID').addEventListener('click', (e) => {
    const idUser = e.target.dataset.id;
    localStorage.setItem('idUserRedirecionar', idUser); // almacenar el id del usuario a redireccionar
    window.location.href = `#/home/profile/${idUser}`;
    console.log('holi');
    console.log(idUser);
  });

  return viewNavLaptop;
};

export const functionNavLaptop = () => {
  if (window.location.hash === '#/home') {
    document.querySelector('.btnHome').classList.add('active');
  } else if (window.location.hash.includes('#/home/profile')) {
    document.querySelector('.btnProfile').classList.add('active');
  }
};
