import { resetPasswordFirebase } from '../firebase/firebase-auth.js';

export const resetPassword = () => {
  const viewResetPassword = document.createElement('div');
  viewResetPassword.classList.add('viewReset');
  viewResetPassword.innerHTML = `
    <div class="logo">SOCIAL NETWORK</div>
    <div><img id="logoLogin" src='./img/lock.png' style="width:195px"></div>
    
    <form id="resetPasswordBtn">
      <div class= "textReset" style="font-size: 22px;">¿Tienes problemas para iniciar sesión?</div>
      <div class= "textReset" style="font-size: 17px;">Ingresa tu correo y te enviaremos <br> un enlace para que recuperes <br> el acceso a tu cuenta</div>
      <input type="email" class="input-reset" id="resetEmail"  placeholder="correo@example.com" required >
      <button type="submit" class="btnLogin">ENVIAR</button>
      <div class="backLogin"><a href="#/login"> Volver a inicio de sesión </a> </div>
    </form>
    
    <section class="modalReset" style="display: none">
      <div class="modalDiv"> 
        <div class="modalContainer">
          <div id="far">
            <i class="far fa-times-circle"></i>
          </div>
          
          <div>
            <h1>Correo electronico enviado</h1>
            <div class="modal-parrafo">
            Te hemos enviado un correo electrónico <b class="emailText"></b> con instrucciones para volver a establecer tu contraseña.</div>
            <button class="aceptReset"><a href="#/login">ACEPTAR</a></button>
          </div>
        </div>
      </div>
    </section>`;

  return viewResetPassword;
};

export const handleReset = (e) => {
  e.preventDefault();

  const email = document.querySelector('#resetEmail').value;
  return resetPasswordFirebase(email)
    .then(() => {
      console.log('Reset Password successful');
      document.querySelector('.modalReset').style.display = 'flex';
      const emailText = document.querySelector('.emailText');
      emailText.innerHTML = `${email}`;
    })
    .catch((err) => {
      const error = err.code;
      console.log(error);
    });
};

export const resetPasswordInit = () => {
  const resetP = document.querySelector('#resetPasswordBtn');

  resetP.addEventListener('submit', handleReset);

  document.querySelector('.far').addEventListener('click', () => {
    document.querySelector('.modalReset').style.display = 'none';
  });
};
