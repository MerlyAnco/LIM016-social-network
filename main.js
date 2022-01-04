import { changeView } from './controller/routes.js';

window.addEventListener('load', changeView);

window.addEventListener('hashchange', changeView);

// const init = () => {
//   changeView(window.location.hash);
//   window.addEventListener('hashchange', () => {
//     changeView(window.location.hash);
//   });
// };

// window.addEventListener('load', init);
