import {
  obtenerInfo, updateComment, deleteComment,
} from '../firebase/firestore.js';

export const templateComents = (comments, id) => {
  console.log(comments);
  const showComment = document.getElementById(`showComment${id}`);
  const divComment = document.createElement('div');
  const commentsElements = comments.map(async (oneComment) => {
    const dataUser = await obtenerInfo(oneComment.userID);
    divComment.innerHTML += `
    <div id="${oneComment.ID}" class="divComment">
      <div class="infoUser">
        <img  id="photo-profile" src="${dataUser.data().photo}" width="24px">
        <div class="name-comment">${dataUser.data().name}</div>

        <div class="icon-options options-comment">
          <ion-icon name="ellipsis-vertical-outline"></ion-icon>
        </div>
      </div>

      <div id="contentEdit-${oneComment.ID}" class="commentText">${oneComment.content}</div>

      <div class="div-options">
        <div class='box-options' id="box-options-${oneComment.ID}" style="display:none">
          <div class='editComment content-icon'>
            <span>
              <i class="fas fa-pencil-alt"></i>Editar
            </span>
          </div>
          
          <div class='deleteComment content-icon'>
            <span>
              <i class="far fa-trash-alt"></i>Borrar
            </span>
          </div>
        </div>
      </div>
    </div>`;
    return divComment;
  });
  Promise.all(commentsElements).then(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    divComment.querySelectorAll('.icon-options').forEach((div) => div.addEventListener('click', (e) => {
      const idComment = e.target.parentNode.parentNode.parentNode.id;
      console.log(idComment);
      for (let i = 0; i < comments.length; i += 1) {
        if (comments[i].userID === user.uid && comments[i].ID === idComment) {
          document.querySelector(`#box-options-${idComment}`).classList.toggle('show');
          break;
        }
      }
    }));

    divComment.querySelectorAll('.deleteComment').forEach((div) => div.addEventListener('click', (e) => {
      const idComment = e.target.parentNode.parentNode.parentNode.parentNode.id;
      for (let i = 0; i < comments.length; i += 1) {
        // console.log(comments[i].ID === idComment && comments[i].userID === user.uid);
        if (comments[i].ID === idComment && comments[i].userID === user.uid) {
          deleteComment(id, idComment);
        }
      }
    }));

    divComment.querySelectorAll('.editComment').forEach((div) => div.addEventListener('click', (e) => {
      const idComment = e.target.parentNode.parentNode.parentNode.parentNode.id;
      console.log(idComment);
      for (let i = 0; i < comments.length; i += 1) {
        console.log(comments[i].ID, idComment);
        if (comments[i].ID === idComment && comments[i].userID === user.uid) {
          document.querySelector(`#contentEdit-${idComment}`).innerHTML = `
            <textarea id="edit-${idComment}">${comments[i].content}</textarea>
            <button id="save-${idComment}" class="save">SAVE</button>`;
          document.querySelector(`#save-${idComment}`).addEventListener('click', () => {
            const commentEdit = document.getElementById(`edit-${idComment}`);
            updateComment(id, idComment, commentEdit.value);
          });
        }
      }
    }));

    showComment.innerHTML = '';
    showComment.appendChild(divComment);
  });
};
