export const view404 = () => {
  const div404 = document.createElement('div');
  div404.classList.add('containerError');
  div404.innerHTML = `
  <h1 >Página no encontrada</h1>
<img id="imgError">
  <button id="error">Inicio</button>
  `;
  document.getElementById('container').appendChild(div404);
};

export const view404Functions = () => {
  document.querySelector('#error').addEventListener('click', () => {
    window.location.hash = '#/home';
  });
};
