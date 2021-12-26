/* eslint-disable no-plusplus */
import {
  deletePost, obtenerInfo, updatePost, readComment, saveComment, saveLike, readLikes, deleteLike,
} from '../firebase/firestore.js';

import { templateComents } from './templateComments.js';

export const template = (post) => {
  console.log(post);
  const showPost = document.getElementById('showPost');
  const nuevoElemento = document.createElement('div');
  const user = JSON.parse(localStorage.getItem('user'));

  post.forEach((onePost) => {
    nuevoElemento.innerHTML += `
    <div class="postDiv" id="${onePost.idP}">
    <div class="div-options">
      <div class="icon-options">
        <ion-icon name="ellipsis-vertical-outline"></ion-icon>
      </div>
      <div class='box-options' id="box-options-${onePost.idP}" style="display:none">
        <div class='edit content-icon'>
          <span>
            <i class="fas fa-pencil-alt"></i>Editar
          </span>
        </div>
        <div class='delete content-icon'>
          <span>
            <i class="far fa-trash-alt"></i>Borrar
          </span>
        </div>
      </div>
    </div>
    <div class="header-post">
        <img  id="post-img${onePost.idP}" width="100px" >
        <div class="header-info">
          <div class="post-name${onePost.idP} namePost"></div>
          <div class="date"><p></p></div> 
        </div>
    </div>
    <div class="text-post-home" id="contentPost${onePost.idP}">${onePost.content}</div>
    <img class="postImg" id="img-${onePost.idP}" src="${onePost.img}">

    <div id="postIcons">
      <div class="likes">
        <i class="far fa-heart icon" id="iconLikes${onePost.idP}"></i>
        <p id='likes${onePost.idP}'></p>
      </div>
      <div class="comments">
        <i class="far fa-comment icon"></i>
        <p class="countComment${onePost.idP}"></p>
      </div>
    </div>
    <div id="comments${onePost.idP}">
      <div id="contentComment${onePost.idP}"></div>
      <div id="showComment${onePost.idP}"></div>
    </div>
    `;

    return nuevoElemento;
  });

  const uidUser = (user.uid);

  post.forEach((one) => {
    const idPost = one.idP;
    const iconLikes = nuevoElemento.querySelector(`#iconLikes${idPost}`);
    const parrafoCountLikes = nuevoElemento.querySelector(`#likes${idPost}`);
    readLikes((likes) => {
      const num = likes.length;
      parrafoCountLikes.innerHTML = num;
      if (likes[0] !== undefined) {
        iconLikes.className = 'fas fa-heart icon';
      }
    }, idPost);

    const parrafoCountComment = nuevoElemento.querySelector(`.countComment${idPost}`);
    readComment((comments) => {
      const num = comments.length;
      parrafoCountComment.innerHTML = num;
    }, idPost);
  });

  post.forEach(async (one) => {
    const idPost = one.idP;
    const idUser = one.userID;

    const parrafoName = nuevoElemento.querySelector(`.post-name${idPost}`);
    const divPhotoUser = nuevoElemento.querySelector(`#post-img${idPost}`);
    const dataUser = await obtenerInfo(idUser);
    parrafoName.innerHTML = dataUser.data().name;
    divPhotoUser.src = dataUser.data().photo;
    // divPhotoUser= dataUser.data().photo;
  });

  nuevoElemento.querySelectorAll('.postImg').forEach((postImg) => {
    // const postImgId = postImg.parentElement.id;
    // console.log(postImgId);
    const imgSrc = postImg;
    console.log(imgSrc.src);
    // eslint-disable-next-line no-plusplus
    if ((imgSrc.src !== 'http://localhost:5000/') && (imgSrc.src !== 'http://127.0.0.1:5500/src/index.html')) {
      imgSrc.className = 'img-post-home';
    } else {
      imgSrc.className = 'postImg';
    }
  });

  nuevoElemento.querySelectorAll('.date').forEach((date) => {
    const postId = date.parentElement.parentElement.parentElement.id;
    const pElement = date.firstChild;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < post.length; i++) {
      if (post[i].idP === postId) {
        const d = new Date();
        const dateUTC = post[i].date;
        d.setTime(dateUTC);
        const dateData = d.toLocaleDateString();
        // console.log(dateData, i);

        pElement.innerHTML = dateData;
      }
    }
  });
  nuevoElemento.querySelectorAll('.icon-options').forEach((div) => {
    div.addEventListener('click', (e) => {
      const id = e.target.parentNode.parentNode.parentNode.id;
      console.log(e.target.parentNode.parentNode.parentNode);
      for (let i = 0; i < post.length; i++) {
        if (post[i].userID === user.uid && post[i].idP === id) {
          document.querySelector(`#box-options-${id}`).classList.toggle('show');
          console.log('holi');
          break;
        }
      }
    });
  });
  nuevoElemento.querySelectorAll('.delete').forEach((div) => {
    div.addEventListener('click', (e) => {
      const id = e.target.parentNode.parentNode.parentNode.parentNode.id;
      document.querySelector('.modalDelete').classList.add('revelar');
      for (let i = 0; i < post.length; i++) {
        document.querySelector('.aceptDelete').addEventListener('click', () => {
          console.log(post[i].userID === user.uid, post[i].idP === id);
          if (post[i].userID === user.uid && post[i].idP === id) {
            deletePost(id);
            document.querySelector('.modalDelete').classList.remove('revelar');
          }
        });
      }
    });
  });

  nuevoElemento.querySelectorAll('.edit').forEach((div) => {
    div.addEventListener('click', (e) => {
      const id = e.target.parentNode.parentNode.parentNode.parentNode.id;
      document.querySelector(`#box-options-${id}`).classList.toggle('show');

      for (let i = 0; i < post.length; i++) {
        console.log(post[i].userID === user.uid, post[i].idP === id);
        if (post[i].userID === user.uid && post[i].idP === id) {
          document.querySelector(`#contentPost${id}`).innerHTML = `<textarea class="editPost" id="contentEdit${post[i].idP}"}>${post[i].content}</textarea>
            <button class="save">SAVE</button>`;
          document.querySelector('.save').addEventListener('click', () => {
            const postEdit = document.getElementById(`contentEdit${post[i].idP}`).value;
            if (postEdit === `${post[i].content}`) {
              document.querySelector(`#contentPost${post[i].idP}`).innerHTML = `${post[i].content}`;
            } else {
              console.log(document.getElementById(`contentEdit${post[i].idP}`).value);
              updatePost(id, postEdit);
            }

            updatePost(id, postEdit);
          });

          break;
          // } else {
          //   alert('no puedes borrar un post ajeno');
          //   break;
        }
      }
    });
  });

  const nameUser = user.displayName;

  nuevoElemento.querySelectorAll('.fa-heart').forEach((like) => {
    like.addEventListener('click', (e) => {
      const postId = e.target.parentNode.parentNode.parentNode.id;
      if (e.target.className === 'far fa-heart icon') {
        e.target.className = 'fas fa-heart icon';
        saveLike(postId, uidUser, nameUser);
        console.log('crea');
      } else {
        e.target.className = 'far fa-heart icon';
        deleteLike(postId, uidUser);
        console.log('borra');
      }
    });
  });

  nuevoElemento.querySelectorAll('.fa-comment').forEach((icon) => {
    icon.addEventListener('click', (e) => {
      const id = e.target.parentNode.parentNode.parentNode.id;
      const showComment = document.getElementById(`showComment${id}`);
      showComment.innerHTML = '';
      readComment(templateComents, id);

      const divComment = document.createElement('div');
      divComment.innerHTML = `<textarea id="textComent${id}"></textarea>
        <button id="saveComment${id}">SAVE</button>`;
      nuevoElemento.querySelector(`#contentComment${id}`).appendChild(divComment);
      document.getElementById(`saveComment${id}`).addEventListener('click', () => {
        const commentOne = document.getElementById(`textComent${id}`).value;
        // if (commentOne !== '') {
        //   console.log(commentOne);
        //   saveComment(id, commentOne, uidUser);
        // } else {
        //   divComment.remove(`<textarea id="textComent${id}"></textarea>
        //   <button id="saveComment${id}">SAVE</button>`);
        // }
        saveComment(id, commentOne, uidUser);
        document.getElementById(`textComent${id}`).value = '';
      });
    });
  });
  showPost.innerHTML = '';
  showPost.appendChild(nuevoElemento);
};
