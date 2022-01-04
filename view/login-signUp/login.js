import {
  loginEmail,
  loginGoogle,
  loginFacebook,
  loginGitHub,
} from '../../firebase/firebase-auth.js';

import { verificarUsuario } from '../verificar-usuario.js';

export const Login = () => {
  const viewHome = document.createElement('div');
  viewHome.classList.add('sectionLogin');
  viewHome.innerHTML = `
  <section class="bubble">
    <!-- content here -->
  </section>

  <section class="section1"><img class="imgInicio" name="imgInicio" ></section>

  <section class="section2">
    <div class="formulario">
      <div id="inicioLogo"> 
        <i class="fas fa-crown inicio"></i>
        <p class="logo">QUEEN CODERS</p>
      </div>
      <div><img id="logoLogin" class="imgInicioPequeño" name="imgInicioPequeño"></div>

      <div class="form-group-text">
        <div class="textForm clickLogin">
          <a href="#/login">Login</a> 
        </div>

        <div class="textForm">
          <a href="#/signup" >Sign Up</a>
        </div>
      </div>

      <form id="login-form">
        <div class="form-group">
          <span class="icon-input">
            <i class="far fa-envelope"></i>
          </span>
          <input type="email" id="login-email" placeholder="correo@example.com" required>
        </div>

        <div class="form-group">
          <span class="icon-input" id="icon-eye">
            <i class="fas fa-eye-slash"></i>
          </span>
          <input type="password" id="login-password"  placeholder="****************" required>
        </div>

        <p id="generalMessage" class="errorMessage"></p>
        <button type="submit" class="btnLogin">LOGIN</button><br>

        <div class="divResetPassword">
          <a href="#/resetPassword" id="resetPass"> Forgot password?</a>
        </div>
        
        <button type="button" class="icon-login" id="googleLogin"><img src="img/google.png"></i></button>
        <button type="button" class="icon-login" id="facebookLogin"><img src="img/facebook.png"></button>
        <button type="button" class="icon-login" id="githubLogin"><img src="img/github.png"></button>
        
        <div class="textResetPassword">
          <p class="registerText">Don't you have an account? <a href="#/signup" class="registerText link">Register now</a></p>
        </div>
      </form>
    </div>
  </section>`;

  return viewHome;
};

function errorOccurs(typeError, text) {
  const errorCode = typeError.code;
  const textMessage = text;
  switch (errorCode) {
    case 'auth/user-not-found':
      textMessage.innerHTML = 'Usuario no encontrado';
      break;
    case 'auth/wrong-password':
      textMessage.innerHTML = 'Contraseña incorrecta.';
      break;
    case 'auth/too-many-requests':
      textMessage.innerHTML = 'Usted excedió el número de intentos fallidos. Reestablezca su contraseña o inténtelo más tarde.';
      break;
    case 'auth/invalid-email':
      textMessage.innerHTML = 'La dirección de correo electrónico no es válida';
      break;
    case 'auth/account-exists-with-different-credential':
      textMessage.innerHTML = 'La dirección de correo electrónico ya es usada en una credencial diferente.';
      break;
    default:
      console.log(errorCode);
      textMessage.innerHTML = 'Lo sentimos, se ha producido un error en la página. Vuelve a intentarlo más tarde.';
  }
}

export const handleSubmit = (e) => {
  e.preventDefault();
  const email = document.querySelector('#login-email').value;
  const password = document.querySelector('#login-password').value;

  return loginEmail(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      if (user.emailVerified === true) {
        verificarUsuario().then(() => {
          localStorage.setItem('user', JSON.stringify(user));
          window.location.hash = '#/home';
        });
      } else {
        alert(
          'Te hemos enviado un email para verificar tu cuenta. Por favor revisa tu bandeja.',
        );
      }
    })
    .catch((error) => {
      const message = document.getElementById('generalMessage');
      errorOccurs(error, message);
    });
};

export const initLogin = () => {
  const signInForm = document.querySelector('#login-form');
  const googleLogin = document.querySelector('#googleLogin');
  const facebookLogin = document.querySelector('#facebookLogin');
  const githubLogin = document.getElementById('githubLogin');

  /* .........Logearse con correo........ */
  signInForm.addEventListener('submit', handleSubmit);

  /* ........Logearse con Google........ */
  googleLogin.addEventListener('click', () => {
    loginGoogle()
      .then(() => verificarUsuario())
      .then((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        window.location.hash = '#/home';
      })
      .catch((error) => {
        const message = document.getElementById('generalMessage');
        errorOccurs(error, message);
      });
  });

  /* .......Logearse con Facebook........ */
  facebookLogin.addEventListener('click', () => {
    loginFacebook()
      .then(() => verificarUsuario())
      .then(() => {
        window.location.hash = '#/home';
      })
      .catch((error) => {
        const message = document.getElementById('generalMessage');
        errorOccurs(error, message);
      });
  });

  /* .......Logearse con GitHub........ */
  githubLogin.addEventListener('click', () => {
    loginGitHub()
      .then(() => verificarUsuario())
      .then(() => {
        window.location.hash = '#/home';
      }).catch((error) => {
        const message = document.getElementById('generalMessage');
        errorOccurs(error, message);
      });
  });

  /* .....Función ocultar y mostrar contraseña..... */
  const iconEye = document.querySelector('#icon-eye');
  // eslint-disable-next-line func-names
  iconEye.addEventListener('click', function () {
    const icon = this.querySelector('i');

    if (this.nextElementSibling.type === 'password') {
      this.nextElementSibling.type = 'text';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    } else {
      this.nextElementSibling.type = 'password';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
  });
  /* ........Imagen grande de Login............. */

  document.imgInicio.src = 'img/gif.gif';

  document.imgInicioPequeño.src = 'img/gif.gif';
};
