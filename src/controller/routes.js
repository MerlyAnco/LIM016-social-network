// eslint-disable-next-line import/no-unresolved
// import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

import { components } from '../view/index.js';

import { stateChanged1 } from '../view/verificar-usuario.js';

// onst auth = getAuth();

const changeView = () => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  const footer = document.getElementById('container-footer');
  footer.innerHTML = '';
  const header = document.getElementById('container-header');
  header.innerHTML = '';

  switch (window.location.hash) {
    case '#':
    case '/':
    case '#/login':
    case '#/':
      container.appendChild(components.login.Login());
      components.login.initLogin();

      break;

    case '#/signup':
      container.appendChild(components.signup.SignUp());
      components.signup.Register();
      break;

    case '#/home':
      stateChanged1();
      header.appendChild(components.navLaptop.navLaptop());
      footer.appendChild(components.navMobile.navMobile());
      components.home.Home();
      components.home.FunctionsHome();
      break;

    case '#/home/profile':
      stateChanged1();
      header.appendChild(components.navLaptop.navLaptop());
      footer.appendChild(components.navMobile.navMobile());
      container.appendChild(components.profile.Profile());
      components.profile.FunctionProfile();
      break;

    case '#/resetPassword':
      container.appendChild(components.resetPassword.resetPassword());
      components.resetPassword.resetPasswordInit();
      break;

      // case '#/newPost':
      //   if (user) {
      //     footer.appendChild(components.navMobile.navMobile());
      //     components.newPost.newPost();
      //     // container.appendChild(components.newPost.newPost());
      //     components.newPost.functionNewPost();
      //   } else {
      //     window.location.hash = '#/home';
      //   }
      //   break;

    case '#/home/profile/editProfile':
      stateChanged1();
      footer.appendChild(components.navMobile.navMobile());
      container.appendChild(components.edit.profileEdit());
      components.edit.FunctionEdit();

      break;

    default:
      window.location.hash = '#/';
      break;
  }
};

export { changeView };

// const changeView = () => {
//   const user = currentUser().currentUser;
//   const container = document.getElementById('container');
//   container.innerHTML = '';
//   const footer = document.getElementById('container-footer');
//   footer.innerHTML = '';
//   const header = document.getElementById('container-header');
//   header.innerHTML = '';

//   switch (window.location.hash.toLowerCase()) {
//     case '#':
//     case '/':
//     case '#/login':
//     case '#/':
//       container.appendChild(components.login.Login());
//       components.login.initLogin();

//       break;

//     case '#/signup':
//       container.appendChild(components.signup.SignUp());
//       components.signup.Register();
//       break;

//     case '#/home':
//       userState();
//       header.appendChild(components.navLaptop.navLaptop());
//       footer.appendChild(components.navMobile.navMobile());
//       components.navMobile.navChangeView();
//       components.home.Home();
//       components.home.FunctionsHome();
//       break;

//     case '#/home/profile':
//       userState();
//       header.appendChild(components.navLaptop.navLaptop());
//       footer.appendChild(components.navMobile.navMobile());
//       container.appendChild(components.profile.Profile());
//       components.navMobile.navChangeView();
//       components.profile.FunctionProfile();
//       break;

//     case '#/resetPassword':
//       container.appendChild(components.resetPassword.resetPassword());
//       components.resetPassword.resetPasswordInit();
//       break;

//       // case '#/newPost':
//       //   if (user) {
//       //     footer.appendChild(components.navMobile.navMobile());
//       //     components.newPost.newPost();
//       //     // container.appendChild(components.newPost.newPost());
//       //     components.newPost.functionNewPost();
//       //   } else {
//       //     window.location.hash = '#/home';
//       //   }
//       //   break;

//     case '#/editProfile':
//       userState();
//       footer.appendChild(components.navMobile.navMobile());
//       container.appendChild(components.edit.profileEdit());
//       components.navMobile.navChangeView();
//       components.edit.FunctionEdit();

//       break;

//     default:
//       window.location.hash = '#/';
//       break;
//   }
// };
// export { changeView };
