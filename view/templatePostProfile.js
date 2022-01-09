/* eslint-disable no-plusplus */
import {
  deletePost, obtenerInfo, updatePost, readComment, saveComment, saveLike, readLikes, deleteLike,
} from '../firebase/firestore.js';
import { templateComents } from './templateComments.js';

export const showPostProfile = (post) => {
  console.log(post);
  const idUserRedirect = window.localStorage.getItem('idUserRedirecionar');
  const user = JSON.parse(localStorage.getItem('user'));
  const PostProfile = document.getElementById('PostProfile');
  const sectionPostProfile = document.createElement('div');

  post.forEach((onePost) => {
    sectionPostProfile.innerHTML += `
    <div class="postDiv" id="${onePost.postID}">

      <div class="div-options">
        <div class='box-options' id="box-options-${onePost.postID}" style="display:none">
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
        <img  id="photo-profile" width="100px">
        <div class="header-info">
          <div  class="nameUserPostProfile${user.uid} namePost post-name"></div>
          <div class="date"><p></p></div>
          <div class="privacityIcons privacity${onePost.postID} fas"></div>
        </div>
        <div class="icon-options">
        <div class="nameType">${onePost.type}</div>
          <ion-icon name="ellipsis-vertical-outline"></ion-icon>
        </div>
      </div>

      <div class="text-post-home" id="contentPost${onePost.postID}">${onePost.content}</div>
      <img class="postImg" id="img-${onePost.postID}" src="${onePost.img}">

      <div id="postIcons">
        <div class="likes">
          <i class="far fa-heart icon" id="iconLikes${onePost.postID}"></i>
          <p id="likes${onePost.postID}" class="amount"></p>
        </div>

        <div class="comments">
          <i class="far fa-comment icon"></i>
          <p class="countComment${onePost.postID} amount"></p>
        </div>
      </div>

      <div class="contentComment">
          <div class="contentWriteComment">
            <textarea id="textComent${onePost.postID}" class="write-comment" placeholder="Write a comment..."></textarea>
            <button class="saveComment save">SAVE</button>
          </div>
      </div> 

      <div id="comments${onePost.postID}">
        <div id="contentComment${onePost.postID}" class="contentComment"></div>
        <div id="showComment${onePost.postID}"></div>
      </div>
    </div>

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
    </section>`;
    return sectionPostProfile;
  });
  //   PostProfile.appendChild(sectionPostProfile);

  post.forEach((one) => {
    const idPost = one.postID;
    const privacityIcon = sectionPostProfile.querySelector(`.privacity${idPost}`);
    if (one.privacity === 'amigos') {
      privacityIcon.classList.add('fa-globe-americas');
    } else {
      privacityIcon.classList.add('fa-lock');
    }
  });

  obtenerInfo(idUserRedirect).then((userInfo) => {
    sectionPostProfile.querySelectorAll(`.nameUserPostProfile${user.uid}`).forEach((nameUser) => {
      // eslint-disable-next-line no-param-reassign
      nameUser.innerHTML = `${userInfo.data().name}`;
    });

    sectionPostProfile.querySelectorAll('#photo-profile').forEach((photoUser) => {
      // eslint-disable-next-line no-param-reassign
      photoUser.src = `${userInfo.data().photo}`;
    });
  });

  const uidUser = user.uid;

  post.forEach((one) => {
    const idPost = one.postID;
    const iconLikes = sectionPostProfile.querySelector(`#iconLikes${idPost}`);
    const parrafoCountLikes = sectionPostProfile.querySelector(`#likes${idPost}`);
    readLikes((likes) => {
      const num = likes.length;
      parrafoCountLikes.innerHTML = num;
      likes.forEach((like) => {
        if (like.userLike === uidUser) {
          iconLikes.className = 'fas fa-heart icon';
        }
      });
    }, idPost);

    const parrafoCountComment = sectionPostProfile.querySelector(`.countComment${idPost}`);
    readComment((comments) => {
      const num = comments.length;
      parrafoCountComment.innerHTML = num;
    }, idPost);
  });

  sectionPostProfile.querySelectorAll('.date').forEach((date) => {
    const postId = date.parentElement.parentElement.parentElement.id;
    const pElement = date.firstChild;
    for (let i = 0; i < post.length; i++) {
      if (post[i].postID === postId) {
        const d = new Date();
        const dateUTC = post[i].date;
        d.setTime(dateUTC);
        const dateData = d.toLocaleDateString();
        pElement.innerHTML = dateData;
      }
    }
  });

  sectionPostProfile.querySelectorAll('.postImg').forEach((postImg) => {
    const imgSrc = postImg;
    if (imgSrc.src !== (window.location.origin + window.location.pathname)) {
      imgSrc.className = 'img-post-home';
    } else {
      imgSrc.className = 'postImg';
    }
  });

  sectionPostProfile.querySelectorAll('.icon-options').forEach((div) => {
    div.addEventListener('click', (e) => {
      const id = e.target.parentNode.parentNode.parentNode.id;
      for (let i = 0; i < post.length; i++) {
        console.log(post);
        if (post[i].userID === user.uid && post[i].postID === id) {
          console.log('Funciona');
          document.querySelector(`#box-options-${id}`).classList.toggle('show');
          console.log(document.querySelector(`#box-options-${id}`).classList);
          break;
        }
      }
    });
  });

  sectionPostProfile.querySelectorAll('.delete').forEach((div) => {
    div.addEventListener('click', (e) => {
      const id = e.target.parentNode.parentNode.parentNode.parentNode.id;
      document.querySelector('.modalDelete').classList.add('revelar');
      for (let i = 0; i < post.length; i++) {
        document.querySelector('.aceptDelete').addEventListener('click', () => {
          console.log(post[i].userID === user.uid, post[i].postID === id);
          if (post[i].userID === user.uid && post[i].postID === id) {
            deletePost(id);
            document.querySelector('.modalDelete').classList.remove('revelar');
          }
        });
      }
      document.querySelector('#closeDelete').addEventListener('click', () => {
        document.querySelector('.modalDelete').classList.remove('revelar');
      });
    });
  });

  sectionPostProfile.querySelectorAll('.edit').forEach((div) => {
    div.addEventListener('click', (e) => {
      const id = e.target.parentNode.parentNode.parentNode.parentNode.id;
      console.log(id);
      // document.querySelector(`#box-options-${id}`).classList.toggle('show');

      for (let i = 0; i < post.length; i++) {
        console.log(i, id, post[i].postID);
        if (post[i].userID === user.uid && post[i].postID === id) {
          document.querySelector(`#contentPost${id}`).innerHTML = `
            <textarea class="editPost" id="contentEdit${post[i].postID}" placeholder="Write a comment...">${post[i].content}</textarea>
            <button class="save" id="save${post[i].postID}">SAVE</button>`;
          document.querySelector(`#save${id}`).addEventListener('click', () => {
            console.log('click');
            const postEdit = document.getElementById(`contentEdit${post[i].postID}`).value;
            if (postEdit === `${post[i].content}`) {
              document.querySelector(`#contentPost${post[i].postID}`).innerHTML = `${post[i].content}`;
            } else {
              console.log(document.getElementById(`contentEdit${post[i].postID}`).value);
              updatePost(id, postEdit);
            }
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
  sectionPostProfile.querySelectorAll('.fa-heart').forEach((like) => {
    like.addEventListener('click', (e) => {
      const postId = e.target.parentNode.parentNode.parentNode.id;
      if (e.target.className === 'far fa-heart icon') {
        e.target.className = 'fas fa-heart icon';
        saveLike(postId, uidUser, nameUser);
        console.log('crea');
        console.log(post);
      } else {
        e.target.className = 'far fa-heart icon';
        deleteLike(postId, uidUser);
        console.log('borra');
      }
    });
  });

  sectionPostProfile.querySelectorAll('.fa-comment').forEach((icon) => {
    icon.addEventListener('click', (e) => {
      const id = e.target.parentNode.parentNode.parentNode.id;
      const showComment = document.getElementById(`showComment${id}`);
      if (showComment.className !== 'showContent') {
        showComment.className = 'showContent';
        showComment.innerHTML = '';
        readComment(templateComents, id);
      } else {
        showComment.className = '';
        showComment.innerHTML = '';
      }
    });
  });

  sectionPostProfile.querySelectorAll('.saveComment').forEach((save) => {
    save.addEventListener('click', (e) => {
      const id = e.target.parentNode.parentNode.parentNode.id;
      console.log(id);
      const showComment = document.getElementById(`showComment${id}`);
      const commentOne = document.getElementById(`textComent${id}`).value;
      if (commentOne === '') {
        alert('Comentario vacío.');
      } else {
        saveComment(id, commentOne, uidUser);
        document.getElementById(`textComent${id}`).value = '';
        showComment.className = 'showContent';
        readComment(templateComents, id);
      }
    });
  });

  PostProfile.innerHTML = '';
  PostProfile.appendChild(sectionPostProfile);
};
